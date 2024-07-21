import { Injectable } from '@angular/core';
import { AuthResponseData, Routes, User } from './user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}
  private API_URL = environment.API_URL;
  defualtUser!: User;
  user = new BehaviorSubject<User>(this.defualtUser);
  expirationDate: any;
  userTypeFlag = new BehaviorSubject<number>(0);;
  routes: Routes[] | undefined;
  invalidUser = new BehaviorSubject(false);
  toolbarFlag = new BehaviorSubject(false);


  login(data: User) {
    return this.http.post<AuthResponseData>(this.API_URL+'login', data)
      .pipe(catchError((errorRes: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error.message) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.message) {
          case 'INVALID_CREDENTIALS':
            errorMessage = 'wrong mail or password';
            this.invalidUser.next(true);
            setTimeout(() => {
              this.invalidUser.next(false);
            }, 2500)
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email is not found';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is wrong';    
        }
        return throwError(errorMessage);
      }), tap(resData => {
        this.handleAuthentication(resData.access_token, resData.company_id, resData.admin_flag,
          resData.expiry_time, resData.routes);
      })
      );
  }

  autoLogin() {
    const data: any = localStorage.getItem('userData')
    const userData = JSON.parse(data);
    if(!userData){
      this.router.navigateByUrl('login');
      this.toolbarFlag.next(false);
      return;
    }
    const loadedUser: User ={
      'id':userData.id, '_token': userData._token, '_tokenDate': new Date(userData._tokenDate), 'routes': [],
      'admin_flag': userData.admin_flag
    }
    if(loadedUser._token){
      this.user.next(loadedUser);
      const expiryDate = new Date(userData._tokenDate).getTime() - new Date().getTime();
      this.toolbarFlag.next(true);
      this.autoLogout(expiryDate);
    }
  }

  logout() {
    return this.http.get(this.API_URL+'logout').subscribe(value => {
      this.user.next(this.defualtUser);
      localStorage.removeItem('userData');
      this.toolbarFlag.next(false);
      this.router.navigateByUrl('login');
      if(this.expirationDate) {
        clearTimeout(this.expirationDate);
      }
      this.expirationDate = null;
    });
  }

  autoLogout(expirationDuration: number) {
    this.expirationDate = setTimeout(()=> {
      this.logout();
    },expirationDuration);
  }

  private handleAuthentication(access_token: string, company_id: number, admin_flag: number,
    expiry_time: number, routes: []) {
    const expirationDate = new Date(
      new Date().getTime() + expiry_time*60*1000 // getTime is in milliseconds so we convert tokenDate which is in seconds into milli seconds, then new Date() will wrapping them and converting them into date
    );
    const expirationTime: number = expiry_time*60*1000;
    // console.log(expirationTime);
    const user: User = {'id': company_id, '_token': access_token, '_tokenDate': expirationDate,
      'routes': routes, 'admin_flag': admin_flag};
    const storageUser = {'id': company_id, '_token': access_token, '_tokenDate': expirationDate};
    this.user.next(user);
    this.routes = routes;
    this.userTypeFlag.next(admin_flag);
    this.toolbarFlag.next(true);
    this.autoLogout(expirationTime);
    localStorage.setItem('userData', JSON.stringify(storageUser)); // this convert js into string (text) to store it in browser
  }



  getStoredUser(): Observable<Routes[]> {
    const data: any = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    this.toolbarFlag.next(true);
    if(!userData){
      this.router.navigateByUrl('login');
    }
    if(this.routes) {
      return of(this.routes);
    }
    else{
      const header = new HttpHeaders().set('Authorization', `Bearer ${userData._token}`)
        .set('Content-Type', 'application/json');
      return this.http.get<Routes[]>(this.API_URL+'get_routes', {'headers': header}).pipe(
        map(data => {
          const loadedUser: User ={
            'id':userData.id, '_token': userData._token,
            '_tokenDate': new Date(userData._tokenDate), 'routes': data, 'admin_flag': +data[0]['user_type_id']
          }
          this.user.next(loadedUser);
          this.routes = data;
          this.userTypeFlag.next(+data[0]['user_type_id']);
          return data;
        })
      );
    }

  }

  changePassword(data: {'oldPassword': string, 'newPassword': string, 'confirmNewPassword': string}) {
    return this.http.post(this.API_URL+'change_password', data)
    .pipe(catchError((errorRes: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error.message) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.message) {
        case 'WRONG_NEW_PASSWORD':
          errorMessage = 'WRONG_NEW_PASSWORD';
          alert(errorMessage);
          break;
        case 'WRONG_PASSWORD':
          errorMessage = 'WRONG_PASSWORD';
          this.invalidUser.next(true);
            setTimeout(() => {
              this.invalidUser.next(false);
            }, 2500)
          break;   
      }
      return throwError(errorMessage);
    }));
  }

}