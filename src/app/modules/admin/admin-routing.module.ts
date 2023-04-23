import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminMainComponent} from "./admin-main/admin-main.component";
import {TournamentComponent} from "./tournament/tournament.component";
import {CategoryComponent} from "./category/category.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'tournament'},
  {
    path: '',
    component: AdminMainComponent,
    children: [
      { path: 'tournament', component: TournamentComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'users', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
