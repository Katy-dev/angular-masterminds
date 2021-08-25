import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ExpertDetails} from "../expert-details.module";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get('https://masterminds-9ba54-default-rtdb.firebaseio.com/experts.json');
  }

  updateData(experts: ExpertDetails[]) {
    return this.http.put('https://masterminds-9ba54-default-rtdb.firebaseio.com/experts.json', experts);
  }
}
