import {Injectable} from '@angular/core';
import {ExpertDetails} from "../expert-details.module";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ExpertListService {
  expertsChanged = new Subject<ExpertDetails[]>();

  private experts: ExpertDetails[] = [];

  constructor() {
  }

  setExpertList(expertList: any) {
    this.experts = expertList;
    this.expertsChanged.next(this.experts.slice());
  }

  getExpertsList() {
    return this.experts.slice();
  }

  getExpert(index: number) {
    let mentor;
    for (let expert of this.experts) {
      if (expert.id === index) {
        mentor = expert;
      }
    }
    return mentor;
  }
}
