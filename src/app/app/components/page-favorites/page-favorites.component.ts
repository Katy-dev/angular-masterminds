import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-favorites',
  templateUrl: './page-favorites.component.html',
  styleUrls: ['./page-favorites.component.scss']
})
export class PageFavoritesComponent implements OnInit {

  isLoading: boolean = false;
  experts: any;

  constructor() {
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (localStorage.getItem('favoritesData')) {
      this.experts = JSON.parse(localStorage.getItem('favoritesData') || '');
    }
    this.isLoading = false;
  }
}
