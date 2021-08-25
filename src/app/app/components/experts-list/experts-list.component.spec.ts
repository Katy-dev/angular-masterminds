import { TestBed } from "@angular/core/testing";
import { ExpertsListComponent } from "./experts-list.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ExpertCardComponent', ()=> {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ExpertsListComponent]
    });
  })

  it ('should create the app', () => {
    let fixture = TestBed.createComponent(ExpertsListComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
})
