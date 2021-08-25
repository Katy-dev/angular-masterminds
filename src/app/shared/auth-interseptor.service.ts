import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, take} from "rxjs/operators";
import {AuthHttpService} from "./service/auth-http.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private AuthService: AuthHttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.AuthService.user.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      const modified = req.clone({params: new HttpParams().set('auth', user.token)})
      return next.handle(modified);
    }));
  }
}
