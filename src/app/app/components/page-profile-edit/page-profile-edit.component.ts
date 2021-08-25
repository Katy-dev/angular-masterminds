import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthHttpService} from "../../../shared/service/auth-http.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-profile',
  templateUrl: './page-profile-edit.component.html',
  styleUrls: ['./page-profile-edit.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})

export class PageProfileEditComponent implements OnInit, OnDestroy {
  @ViewChild('editUserData') form: NgForm;
  isLoading: boolean = false;
  error: any;
  sub: Subscription;
  displayName: string;
  email: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authHttpService: AuthHttpService) {
  }

  ngOnInit(): void {
    const {displayName, email} = JSON.parse(localStorage.getItem('userData') || '');
    this.displayName = displayName;
    this.email = email;
  }

  onSubmit(form: NgForm) {
    let email = form.value.email;
    if (email === this.email) {
      this.error = "You need to enter a new email address"
      setTimeout(() => {
        this.error = null;
      }, 5000)
      return;
    }

    this.error = null;
    this.isLoading = true;
    this.sub = this.authHttpService.changeEmail(email).subscribe(resData => {
      this.router.navigate(['/profile'], {queryParams: {message: 'Data updated successfully!'}});
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      setTimeout(() => {
        this.error = null;
      }, 5000)
    });
  }

  onCancel() {
    this.router.navigate(['/profile'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
