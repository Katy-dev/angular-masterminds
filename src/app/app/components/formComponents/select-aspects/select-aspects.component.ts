import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataSelectStorageService} from "../../../../shared/service/data-select-storage.service";

@Component({
  selector: 'app-select-aspects',
  templateUrl: './select-aspects.component.html',
  styleUrls: ['./select-aspects.component.scss']
})
export class SelectAspectsComponent implements OnInit {

  public selectAspectsForm: FormGroup;

  public searchInput: String = '';
  public toggle: Boolean = false;
  public searchResult: string[] = [];
  public choseItems: any[] = [];
  public selectedInput: string = '';

  defaultAspects: string[] = ['Physical health', 'Well-being', 'Mental health'];

  constructor(private formBuilder: FormBuilder, private selectStorage: DataSelectStorageService) {
    this.selectAspectsForm = this.formBuilder.group({
      aspects: ['', Validators.required]
    })
  }

  fetchAspectsItems(event: any) {
    this.searchResult = this.selectStorage.aspectsList.filter((item) => {
      return item.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    this.toggle = false;
  }

  showDetails(item: string) {
    this.choseItems.push(item);
    this.selectedInput = item;
    this.toggle = true;
  }

  ngOnInit() {
  }

  public createFormGroup(): FormGroup {
    return this.selectAspectsForm
  }
}
