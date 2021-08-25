import {Component, Input} from '@angular/core';
import {ExpertDetails} from "../../../../shared/expert-details.module";

@Component({
  selector: 'app-expert-card',
  templateUrl: './expert-card.component.html',
  styleUrls: ['./expert-card.component.scss']
})
export class ExpertCardComponent {
  @Input() index: number;
  @Input() expert: ExpertDetails;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor() {
  }

  countStar(star: number) {
    this.selectedValue = star;
  }
}
