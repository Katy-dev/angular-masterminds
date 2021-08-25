import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthHttpService} from "../../../shared/service/auth-http.service";
import {CreateComponentService} from "../../../shared/service/createComponent.service";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})

export class PageLoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  error: any;
  private sub: Subscription;

  toggle: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthHttpService,
              private createComponentService: CreateComponentService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, this.emailValidator]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (typeof email !== "string" && !EMAIL_REGEXP.test(email)) {
      return {"email": true};
    }
    return null;
  }


  onSubmit() {
    if (!this.loginForm.value) return;

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.error = null;
    this.isLoading = true;

    this.sub = this.authService.login(email, password).subscribe(resData => {
      this.isLoading = false;
      this.createComponentService.closeComponent();
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    this.loginForm.reset();
  }

  onClose() {
    this.createComponentService.closeComponent();
  }

  onSignup() {
    this.createComponentService.createSignUp();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
