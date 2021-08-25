import {Component, OnInit} from '@angular/core';
import {AuthHttpService} from "./shared/service/auth-http.service";
import {RouterOutlet} from "@angular/router";
import {routeAnimations} from './shared/router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthHttpService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }
}
