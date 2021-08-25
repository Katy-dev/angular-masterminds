import {Injectable, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {PageLoginComponent} from "../../app/components/page-login/page-login.component";
import {PageSignUpComponent} from "../../app/components/page-sign-up/page-sign-up.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CreateComponentService {

  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  vcr: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {
  }

  createLogin() {
    this.isLoggedIn.next(true);
  }

  createSignUp() {
    this.isLoggedIn.next(false);
  }

  closeComponent() {
    this.vcr.clear();
  }

  async loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    this.vcr = vcr;
    const {PageLoginComponent} = await import('../../app/components/page-login/page-login.component');

    const {PageSignUpComponent} = await import('../../app/components/page-sign-up/page-sign-up.component');

    vcr.clear();
    let component: any = isLoggedIn ? PageLoginComponent : PageSignUpComponent;

    return vcr.createComponent(
      this.cfr.resolveComponentFactory(component))
  }
}





