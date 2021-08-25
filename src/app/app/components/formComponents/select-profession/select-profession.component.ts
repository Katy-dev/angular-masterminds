import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-select-profession',
  templateUrl: './select-profession.component.html',
  styleUrls: ['./select-profession.component.scss']
})
export class SelectProfessionComponent implements OnInit {
  public selectForm: FormGroup;

  public searchInput: String = '';
  public toggle: Boolean = false;
  public searchResult: string[] = [];
  public selectedInput: string = '';

  itemsList: string[] = [
    'Marketing consultant',
    'Psychologist',
    'Frontend engineer',
    'Product manager',
    'Designer',
    'Backend engineer',
  ];

  constructor(private formBuilder: FormBuilder) {
    this.selectForm = this.formBuilder.group({
      profession: ['', Validators.required]
    })
  }

  fetchItems(event: any) {
    this.searchResult = this.itemsList.filter((item) => {
      return item.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    this.toggle = false;
  }

  showDetails(item: string) {
    this.selectedInput = item;
    this.toggle = true;
    this.searchInput = item
    this.selectForm.patchValue({profession: this.selectedInput});
  }

  ngOnInit() {
  }

  public createFormGroup(): FormGroup {
    return this.selectForm;
  }

}
