import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthHttpService} from "../../../shared/service/auth-http.service";
import {Subscription} from "rxjs";
import {CreateComponentService} from "../../../shared/service/createComponent.service";
import {passwordConfirming} from "../../../shared/validators";

@Component({
  selector: 'app-page-sign-up',
  templateUrl: './page-sign-up.component.html',
  styleUrls: ['./page-sign-up.component.scss']
})
export class PageSignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  toggle: boolean = false;

  isLoading: boolean = false;
  error: any;
  sub: Subscription;

  constructor(
    private authService: AuthHttpService,
    private createComponentService: CreateComponentService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'fullName': new FormControl('', [Validators.minLength(3), Validators.required]),
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, {validators: passwordConfirming});
  }

  onSubmit() {
    if (!this.signUpForm.value) return;
    let displayName = this.signUpForm.value.fullName;
    let email = this.signUpForm.value.email;
    let password = this.signUpForm.value.password;

    this.error = null;
    this.isLoading = true;

    this.sub = this.authService.singUp(displayName, email, password).subscribe(resData => {
      this.isLoading = false;
      this.onClose();
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    this.signUpForm.reset();
  }

  onClose() {
    this.createComponentService.closeComponent();
  }

  onLogin() {
    this.createComponentService.createLogin();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
