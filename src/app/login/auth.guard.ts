import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, filter, map, take } from 'rxjs/operators';

import { LoginService } from './login.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
    success: boolean = false;
    constructor(private loginService: LoginService, private router: Router) {}
    
     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.loginService.getStoredUser().pipe(
            map(data => {
                let statename: string = state.url.replace("/", "");
                if(data.find((d) => d.route_name == statename)) {
                    // console.log("authguard canActivate");
                    return true;
                }
                else{
                    // return false;
                    this.loginService.logout();
                    return this.router.createUrlTree(['/login']);
                }
            })
        )
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.loginService.getStoredUser().pipe(
            map(data => {
                let statename: string = state.url.replace("/", "");
                if(data.find((d) => d.route_name == statename)) {
                    // console.log("authguard canActivateChild");
                    return true;
                }
                else{
                    // return false;
                    this.loginService.logout();
                    return this.router.createUrlTree(['/login']);
                }
            })
        )
    }

    // checkUserAccess(state: RouterStateSnapshot) {
    //     return this.loginService.getStoredUser().pipe(
    //         map(data => {
    //             let statename: string = state.url.replace("/", "");
    //             if(data.find((d) => d.route_name == statename)) {
    //                 console.log("authguard canActivate");
    //                 return true;
    //             }
    //             else{
    //                 // return false;
    //                 this.loginService.logout();
    //                 return this.router.createUrlTree(['/login']);
    //             }
    //         })
    //     )
    // }
}