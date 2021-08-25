import {map} from "rxjs/operators";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthHttpService} from "./service/auth-http.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthHttpService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true
        }
        return this.router.createUrlTree(['/expertList']);
      }),
    )
  }
}
