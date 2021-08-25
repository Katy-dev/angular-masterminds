import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  newExpert: any;

  constructor() {
  }

  setData(data: any): void {
    this.newExpert = {...data, ...this.newExpert};
  }

}
