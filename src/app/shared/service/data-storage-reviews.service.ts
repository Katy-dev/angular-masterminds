import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageReviewsService {

  constructor() {
  }

  reviews = [
    {image: '/assets/images/avatar-review1.png', name: 'Thomas H.', rating: 4},
    {image: '/assets/images/avatar-review2.png', name: 'Ella D.', rating: 5},
    {image: '/assets/images/avatar-review3.png', name: 'Michael I.', rating: 3},
    {image: '/assets/images/avatar-review1.png', name: 'Thomas H.', rating: 4},
    {image: '/assets/images/avatar-review2.png', name: 'Ella D.', rating: 5},
    {image: '/assets/images/avatar-review3.png', name: 'Michael I.', rating: 4},
    {image: '/assets/images/avatar-review1.png', name: 'Michael I.', rating: 3},
    {image: '/assets/images/avatar-review2.png', name: 'Ella D.', rating: 5},
    {image: '/assets/images/avatar-review3.png', name: 'Michael I.', rating: 4},
    {image: '/assets/images/avatar-review1.png', name: 'Thomas H.', rating: 5}

  ];
}

