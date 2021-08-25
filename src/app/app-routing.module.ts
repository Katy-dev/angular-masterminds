import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/auth.guard";

import {ExpertsListComponent} from "./app/components/experts-list/experts-list.component";
import {PageNotFoundComponent} from "./app/components/page-not-found/page-not-found.component";
import {PageFavoritesComponent} from "./app/components/page-favorites/page-favorites.component";
import {PageSearchComponent} from "./app/components/page-search/page-search.component";
import {PageAboutUsComponent} from "./app/components/page-about-us/page-about-us.component";
import {PageSignUpMentor2Component} from "./app/components/page-sign-up -mentor2/page-sign-up-mentor2.component";
import {PageSignUpMentorComponent} from "./app/components/page-sign-up-mentor/page-sign-up-mentor.component";
import {PageMentorComponent} from "./app/components/page-mentor/page-mentor.component";
import {PageProfileComponent} from "./app/components/page-profile/page-profile.component";
import {PageProfileEditComponent} from "./app/components/page-profile-edit/page-profile-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/expertList', pathMatch: 'full'},
  {path: 'expertList', component: ExpertsListComponent},
  {path: 'mentor/:id', component: PageMentorComponent, data: {animationState: 'isLeft'}},
  {path: 'favorites', component: PageFavoritesComponent, canActivate: [AuthGuard], data: {animationState: 'isRight'}},
  {path: 'search', component: PageSearchComponent, data: {animationState: 'isLeft'}},
  {path: 'about', component: PageAboutUsComponent, data: {animationState: 'isRight'}},
  {path: 'signUpMentor1', component: PageSignUpMentorComponent},
  {path: 'signUpMentor2', component: PageSignUpMentor2Component, data: {animationState: 'isLeft'}},
  {path: 'profile', component: PageProfileComponent, data: {animationState: 'isRight'}},
  {path: 'profileEdit', component: PageProfileEditComponent, data: {animationState: 'isLeft'}},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
