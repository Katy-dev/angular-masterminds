import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

interface Expert {
  image: string;
  fullName: string;
  profession: string
}

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  getCountFavorites = new BehaviorSubject<number>(0);
  favoriteExperts: Expert[] = [];

  constructor() {
  }

  chooseExpert(expert: Expert) {
    if (!expert) return;
    this.favoriteExperts.push(expert);
    this.getCountFavorites.next(this.favoriteExperts.length);
    localStorage.setItem('favoritesData', JSON.stringify(this.favoriteExperts));
  }

  removeExpert(expert: Expert) {
    let favorites = JSON.parse(localStorage.getItem('favoritesData') || '');
    if (favorites.length !== 0) {
      let filteredExpert = favorites.filter((e: any) => e.fullName !== expert.fullName);
      localStorage.setItem('favoritesData', JSON.stringify(filteredExpert));
      this.favoriteExperts = filteredExpert;
      this.getCountFavorites.next(filteredExpert.length);
    }
  }

}
