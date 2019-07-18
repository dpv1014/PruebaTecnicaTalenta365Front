import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieListComponent} from './movie-list/movie-list.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';

const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'reservations', component: ReservationListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
