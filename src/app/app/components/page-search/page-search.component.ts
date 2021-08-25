import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSelectStorageService} from "../../../shared/service/data-select-storage.service";
import {ExpertListService} from "../../../shared/service/expertList.service";
import {Subscription} from "rxjs";
import {ExpertDetails} from "../../../shared/expert-details.module";
import {DataStorageService} from "../../../shared/service/data.storage.service";

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss'],
})
export class PageSearchComponent implements OnInit, OnDestroy {
  searchName: string = '';
  isLoading: boolean = false;
  experts: ExpertDetails[];
  sub: Subscription;

  searchInputAspects: String = '';
  toggleAspects: Boolean = false;
  searchResultAspects: string[] = [];
  choseAspects: any[] = [];
  selectedAspects: string = '';

  defaultAspects: string[] = ['Physical health', 'Well-being', 'Mental health'];

  constructor(private selectStorage: DataSelectStorageService,
              private expertListService: ExpertListService,
              private dataStorageService: DataStorageService) {}

  ngOnInit(): void {

    this.sub = this.expertListService.expertsChanged.subscribe((experts: ExpertDetails[]) => {
      this.experts = experts;
    })
    this.experts = this.expertListService.getExpertsList();
    if (!this.experts.length) {
      this.isLoading = true;
      this.dataStorageService.getData().subscribe((data: any) => {
        this.experts = data;
        this.isLoading = false;
        this.expertListService.setExpertList(data);
      });
    }
  }

  //select professional aspects
  fetchAspectsItems(event: any) {
    this.searchResultAspects = this.selectStorage.aspectsList.filter((item) => {
      return item.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    this.toggleAspects = false;
  }

  showDetailsAspects(item: string) {
    this.choseAspects.push(item);
    this.selectedAspects = item;
    this.toggleAspects = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
