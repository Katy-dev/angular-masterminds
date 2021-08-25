import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./shared/auth-interseptor.service";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";

import {AppComponent} from './app.component';
import {HeaderComponent} from './app/components/header/header.component';
import {FooterComponent} from './app/components/footer/footer.component';
import {ExpertCardComponent} from './app/components/experts-list/expert-card/expert-card.component';
import {ExpertsListComponent} from './app/components/experts-list/experts-list.component';
import {PageNotFoundComponent} from './app/components/page-not-found/page-not-found.component';
import {PageFavoritesComponent} from './app/components/page-favorites/page-favorites.component';
import {PageSearchComponent} from './app/components/page-search/page-search.component';
import {PageAboutUsComponent} from './app/components/page-about-us/page-about-us.component';
import {PageLoginComponent} from './app/components/page-login/page-login.component';
import {PageSignUpComponent} from './app/components/page-sign-up/page-sign-up.component';
import {PageSignUpMentor2Component} from './app/components/page-sign-up -mentor2/page-sign-up-mentor2.component';
import {SelectProfessionComponent} from "./app/components/formComponents/select-profession/select-profession.component";
import {SelectAspectsComponent} from './app/components/formComponents/select-aspects/select-aspects.component';
import {PageSignUpMentorComponent} from './app/components/page-sign-up-mentor/page-sign-up-mentor.component';
import {PageMentorComponent} from './app/components/page-mentor/page-mentor.component';
import {ModalContactMeComponent} from './app/components/modal-contact-me/modal-contact-me.component';
import {PageProfileEditComponent} from './app/components/page-profile-edit/page-profile-edit.component';
import {AuthDirective} from './shared/auth.directive';
import {FilterPipe} from './shared/filter.pipe';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {PageProfileComponent} from './app/components/page-profile/page-profile.component';
import {TooltipDirective} from "./shared/tooltip.directive";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExpertCardComponent,
    ExpertsListComponent,
    PageNotFoundComponent,
    PageFavoritesComponent,
    PageSearchComponent,
    PageAboutUsComponent,
    PageLoginComponent,
    PageSignUpComponent,
    PageSignUpMentor2Component,
    SelectProfessionComponent,
    SelectAspectsComponent,
    PageSignUpMentorComponent,
    PageMentorComponent,
    ModalContactMeComponent,
    PageProfileEditComponent,
    AuthDirective,
    FilterPipe,
    LoadingSpinnerComponent,
    PageProfileComponent,
    TooltipDirective,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCuA2DvUQrld38b7b2I7a204FLujMG1ZhQ",
      authDomain: "masterminds-9ba54.firebaseapp.com",
      databaseURL: "https://masterminds-9ba54-default-rtdb.firebaseio.com",
      projectId: "masterminds-9ba54",
      storageBucket: "masterminds-9ba54.appspot.com",
      messagingSenderId: "96168485814",
      appId: "1:96168485814:web:691be72abf0315933a5717",
      measurementId: "G-MCVEFNQZMN"
    }),
    AngularFireStorageModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
