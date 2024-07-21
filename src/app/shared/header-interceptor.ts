import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) { }
    private API_URL = environment.API_URL;
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.loginService.user.pipe(take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                if (req.url === this.API_URL + "uploadImg" || req.url === this.API_URL + "import_requests" ||
                    req.url === this.API_URL + "import_items" || req.url === this.API_URL + "import_users") {
                    var modifiedReq = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${user._token}`)
                    });
                }
                else {
                    var modifiedReq = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${user._token}`).set
                            ('content-type', 'application/json')
                    });
                }
                return next.handle(modifiedReq);
            })
        )
    }
}
