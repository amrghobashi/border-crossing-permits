import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }
  private API_URL = environment.API_URL;

//   fieUrls = ['http://localhost/passApi/public/api/uploadImg', 'http://localhost/passApi/public/api/import_requests',
//    'http://localhost/passApi/public/api/import_items', 'http://localhost/passApi/public/api/import_users'];
//   fieUrls = ['uploadImg', 'import_requests', 'import_items', 'import_users'];

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const userToken = 'asdgjas26a55sd655as5d4a56';
  //   const modifiedReq = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${userToken}`).set('Content-Type', 'application/json')
  //   })
  //   return next.handle(modifiedReq);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.loginService.user.pipe(take(1), 
        exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }
            if(req.url === this.API_URL+"uploadImg" || req.url === this.API_URL+"import_requests" ||
                req.url === this.API_URL+"import_items" || req.url === this.API_URL+"import_users") {
                var modifiedReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${user._token}`)
                        // .set('content-type', 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substring(2))
                });
            }
            else{
                var modifiedReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${user._token}`).set('content-type', 'application/json')
                });
            }
            return next.handle(modifiedReq);
        })
    )
}   
}
