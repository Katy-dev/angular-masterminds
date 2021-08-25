import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExpertListService} from "../../../shared/service/expertList.service";
import {DataStorageReviewsService} from "../../../shared/service/data-storage-reviews.service";
import {FavoritesService} from "../../../shared/service/favorites.service";
import {DataStorageService} from "../../../shared/service/data.storage.service";

interface Review {
  image: string,
  name: string,
  rating: number
}

@Component({
  selector: 'app-mentor-page',
  templateUrl: './page-mentor.component.html',
  styleUrls: ['./page-mentor.component.scss'],
})

export class PageMentorComponent implements OnInit {
  id: number;
  expert?: any;
  toggleModal: boolean = false;
  Liked: boolean;
  allReviews: Review[] = [];
  reviews: Review[] = [];
  partReviews: Review[] = [];
  show: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 4;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private expertListService: ExpertListService,
              private storageReviews: DataStorageReviewsService,
              private favoritesService: FavoritesService,
              private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.expert = this.expertListService.getExpert(this.id);

    if (!this.expert) {
      this.dataStorageService.getData().subscribe((data: any) => {
        this.expertListService.setExpertList(data);
        this.expert = this.expertListService.getExpert(this.id);
        if (localStorage.getItem('favoritesData')) this.toggleBtn(this.expert);
      });
    }
    if (localStorage.getItem('favoritesData')) this.toggleBtn(this.expert);

    this.allReviews = this.storageReviews.reviews;
    this.partReviews = this.allReviews.slice(0, 3);
    this.reviews = this.partReviews;
  }

  onLike() {
    this.Liked = !this.Liked;
    if (this.Liked) {
      this.favoritesService.chooseExpert(this.expert);
    } else {
      this.favoritesService.removeExpert(this.expert);
    }
  }

  getAllReviews() {
    this.show = !this.show;
    if (this.show) {
      this.reviews = this.allReviews;
    } else {
      this.reviews = this.partReviews;
    }
  }

  openModal() {
    this.toggleModal = true;
  }

  closeModal() {
    this.toggleModal = false;
  }

  toggleBtn(expert: any) {
    let favorites = JSON.parse(localStorage.getItem('favoritesData') || '');
    if (favorites.length != 0 && expert) {
      this.Liked = favorites.find((e: any) => e.fullName === expert.fullName);
    }
  }

}
