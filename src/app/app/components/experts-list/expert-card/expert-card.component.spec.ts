import { TestBed } from "@angular/core/testing";
import { ExpertCardComponent } from "./expert-card.component";
import { RouterTestingModule } from '@angular/router/testing';


describe('ExpertCardComponent', ()=> {
   beforeEach(() => {
     TestBed.configureTestingModule({
       imports: [RouterTestingModule],
       declarations: [ExpertCardComponent]
     });
   })

  it ('should create the app', () => {
    let fixture = TestBed.createComponent(ExpertCardComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
})
