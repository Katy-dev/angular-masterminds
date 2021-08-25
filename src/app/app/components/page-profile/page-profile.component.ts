import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthHttpService} from "../../../shared/service/auth-http.service";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ExpertDetails} from "../../../shared/expert-details.module";
import {ExpertListService} from "../../../shared/service/expertList.service";
import {DataStorageService} from "../../../shared/service/data.storage.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({opacity: 0}),
        animate('100ms', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('100ms', style({opacity: 0}))
      ])
    ]),
  ]
})

export class PageProfileComponent implements OnInit, OnDestroy {
  @ViewChild('editPassword') form: NgForm;
  @ViewChild('input') inputRef: ElementRef;

  toggle: boolean = false;
  isLoading: boolean = false;
  error: any;
  success: any;
  successMassage: string = 'You have successfully changed your password!';
  sub: Subscription;
  expListSub: Subscription;
  updateSub: Subscription;
  image: File;
  imagePreview: string | ArrayBuffer | null = 'assets/images/Avatar.svg';

  selectedFile: File;
  downloadURL: Observable<string>;
  experts: ExpertDetails[];
  expert: any;
  checkMentor: any;
  tooltipMessage: string;

  user: {
    displayName: string;
    email: string;
    id: string;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authHttpService: AuthHttpService,
              private expertListService: ExpertListService,
              private storage: AngularFireStorage,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '');
    this.expListSub = this.expertListService.expertsChanged.subscribe((experts: ExpertDetails[]) => {
      this.experts = experts;
    });
    this.experts = this.expertListService.getExpertsList();
    this.checkMentor = this.experts.find((e: any) => e.fullName === this.user.displayName);
    this.checkMentor ? this.tooltipMessage = 'You can upload your photo' : this.tooltipMessage = 'Only mentor can upload photo!';

    if (this.experts.length) {
      if (!this.checkMentor) return;
      this.expert = this.experts.find((e: any) => e.fullName === this.user.displayName);
      this.imagePreview = this.expert.image;
    }

    if (!this.experts.length) {
      this.dataStorageService.getData().subscribe((data: any) => {
        this.experts = data;
        this.expertListService.setExpertList(data);
        this.checkMentor = this.experts.find((e: any) => e.fullName === this.user.displayName);
        this.expert = this.experts.find((e: any) => e.fullName === this.user.displayName);
        if (this.checkMentor) {
          this.imagePreview = this.expert.image;
          this.tooltipMessage = 'You can upload your photo';
        }
      });
    }
    this.route.queryParams.subscribe((params) => {
      this.success = params.message;
    });
  }

  editUserData() {
    this.router.navigate(['/profileEdit'], {relativeTo: this.route});
  }

  onChangePassword() {
    this.toggle = !this.toggle;
  }

  onSubmit(form: NgForm) {
    this.toggle = !this.toggle;
    let password = form.value.password;

    this.error = null;
    this.isLoading = true;

    this.sub = this.authHttpService.changePassword(password).subscribe(resData => {
      if (resData) {
        this.success = this.successMassage;
        this.isLoading = false;
        setTimeout(() => {
          this.success = null;
        }, 5000)
      }
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      setTimeout(() => {
        this.error = null;
      }, 5000)
    });
  }

  upLoadPhoto() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(e: any) {
    let n = Date.now();
    const file = e.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    if (reader) {
      reader.readAsDataURL(file);
    }
    const filePath = `Images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Images/${n}`, file);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              let filteredExperts = this.experts.filter((e: any) => e.fullName !== this.user.displayName);
              this.expert!.image = url;
              filteredExperts.push(this.expert!);
              this.updateSub = this.dataStorageService.updateData(filteredExperts).subscribe((res) => {
                this.expertListService.setExpertList(res);
              })
            }
          });
        })).subscribe(url => {
      if (url?.state === "success") {
        this.success = "You have successfully changed your photo";
      }
      setTimeout(() => {
        this.success = null;
      }, 5000)
    })
  }

  onLogout() {
    this.authHttpService.logout();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.expListSub) {
      this.expListSub.unsubscribe();
    }
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
