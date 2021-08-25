import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataSelectStorageService} from "../../../shared/service/data-select-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareDataService} from "../../../shared/service/share-data.service";
import {Subscription} from "rxjs";
import {AuthHttpService} from "../../../shared/service/auth-http.service";
import {ExpertDetails} from "../../../shared/expert-details.module";
import {ExpertListService} from "../../../shared/service/expertList.service";
import {DataStorageService} from "../../../shared/service/data.storage.service";

@Component({
  selector: 'app-form-expert-page2',
  templateUrl: './page-sign-up-mentor2.component.html',
  styleUrls: ['./page-sign-up-mentor2.component.scss']
})
export class PageSignUpMentor2Component implements OnInit, OnDestroy {
  @ViewChild('signUpMentor') form: NgForm;
  searchInputAspects: String = '';
  toggleAspects: Boolean = false;
  searchResultAspects: string[] = [];
  choseAspects: string[] = [];
  selectedAspects: string = '';
  setSelectValue: string[] = [];
  defaultAspects: string[] = ['Physical health', 'Well-being', 'Mental health'];

  searchInput: String = '';
  toggle: Boolean = false;
  searchResult: string[] = [];
  selectedInput: string = '';

  searchItem: [] = [];
  isLoading: boolean = false;
  error: any;
  expSub: Subscription;
  expListSub: Subscription;
  updateSub: Subscription;
  experts: ExpertDetails[];

  expert = {
    profession: '',
    aspects: [],
    skills: '',
    rate: '',
    terms: ''
  }
  newExpert: any;

  constructor(private selectStorage: DataSelectStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthHttpService,
              private shareDataService: ShareDataService,
              private expertListService: ExpertListService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.expListSub = this.expertListService.expertsChanged.subscribe((experts: ExpertDetails[]) => {
      this.experts = experts;
    });
    this.experts = this.expertListService.getExpertsList();
  }

//select professional aspects
  fetchAspectsItems(event: any) {
    this.searchResultAspects = this.selectStorage.aspectsList.filter((item) => {
      return item.toLowerCase().startsWith(event.target.value.toLowerCase())
    })
    this.toggleAspects = false;
  }

  showDetailsAspects(item: string) {
    this.choseAspects.push(item);
    this.setSelectValue.push(...this.defaultAspects, item);
    this.selectedAspects = item;
    this.toggleAspects = true;
  }

  //select professional
  fetchItems(event: any) {
    this.searchResult = this.selectStorage.itemsList.filter((item) => {
      return item.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    this.toggle = false;
  }

  showDetails(item: string) {
    this.selectedInput = item;
    this.toggle = true;
    this.searchInput = item;
  }

  setSelectValues() {
    this.form.form.patchValue({
      aspects: this.setSelectValue,
      profession: this.searchInput
    })
  }

  onSubmit(form: NgForm) {
    this.expert.profession = form.value.profession;
    this.expert.aspects = form.value.aspects;
    this.expert.skills = form.value.skills;
    this.expert.rate = form.value.rate;
    this.expert.terms = form.value.terms;
    this.shareDataService.setData(this.expert);
    this.newExpert = this.shareDataService.newExpert;

    const {email, password} = this.newExpert;
    const displayName = this.newExpert.fullName;

    this.error = null;
    this.isLoading = true;

    this.expSub = this.authService.singUp(displayName, email, password).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate([''], {relativeTo: this.route});
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    this.experts.push({id: this.experts.length + 1, image: "assets/images/Avatar.svg", ...this.newExpert});
    this.updateSub = this.dataStorageService.updateData(this.experts).subscribe((res) => {
      this.expertListService.setExpertList(res);
    })
  }

  onBack() {
    this.router.navigate(['/signUpMentor1'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.expSub) {
      this.expSub.unsubscribe();
    }
    if (this.expListSub) {
      this.expListSub.unsubscribe();
    }
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
