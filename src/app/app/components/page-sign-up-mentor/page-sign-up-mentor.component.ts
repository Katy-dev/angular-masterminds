import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {passwordConfirming} from "../../../shared/validators";
import {ShareDataService} from "../../../shared/service/share-data.service";

@Component({
  selector: 'app-page-sign-up-mentor',
  templateUrl: './page-sign-up-mentor.component.html',
  styleUrls: ['./page-sign-up-mentor.component.scss']
})
export class PageSignUpMentorComponent implements OnInit {

  signUpMentorForm: FormGroup;

  mentor = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private shareDataService: ShareDataService) {
  }

  ngOnInit(): void {
    this.signUpMentorForm = new FormGroup({
      'fullName': new FormControl('', [Validators.minLength(3), Validators.required]),
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, {validators: passwordConfirming});
  }

  onSubmit() {
    if (!this.signUpMentorForm.value) return;
    this.mentor.fullName = this.signUpMentorForm.value.fullName;
    this.mentor.email = this.signUpMentorForm.value.email;
    this.mentor.password = this.signUpMentorForm.value.password;
    this.mentor.confirmPassword = this.signUpMentorForm.value.confirmPassword;
    this.router.navigate(['/signUpMentor2'], {relativeTo: this.route});
    this.shareDataService.setData(this.mentor);
    this.signUpMentorForm.reset();
  }
}
