import {Component, Input, OnInit} from '@angular/core';
import {ExpertListService} from "../../../shared/service/expertList.service";
import {DataStorageService} from "../../../shared/service/data.storage.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query('div', style({opacity: '0'})),
        query('div',
          stagger('600ms', [
            animate('800ms', style({opacity: '1'}))
          ]))
      ])
    ])
  ]
})
export class ExpertsListComponent implements OnInit {
  experts: any;
  @Input() hidden: boolean = true;
  isLoading: boolean = false;

  constructor(private expertListService: ExpertListService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataStorageService.getData().subscribe((data: any) => {
      this.experts = data;
      this.isLoading = false;
      this.expertListService.setExpertList(data);
    });
  }
}
