import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TournamentListComponent} from "./tournament-list/tournament-list.component";
import {TournamentDetailComponent} from "./tournament-detail/tournament-detail.component";

const routes: Routes = [
  {
    path: '',
    component: TournamentListComponent
  },
  {
    path: ':tournamentId',
    component: TournamentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
