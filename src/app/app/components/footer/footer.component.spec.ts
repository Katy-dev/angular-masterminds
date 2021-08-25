import { TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { RouterTestingModule } from '@angular/router/testing';


describe('ExpertCardComponent', ()=> {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FooterComponent]
    });
  })

  it ('should create the app', () => {
    let fixture = TestBed.createComponent(FooterComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
})
