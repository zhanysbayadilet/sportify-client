import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TournamentComponent } from './tournament/tournament.component';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { CategoryComponent } from './category/category.component';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import {TranslateModule} from "@ngx-translate/core";
import { UsersComponent } from './users/users.component';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
  declarations: [
    AdminMainComponent,
    TournamentComponent,
    CategoryComponent,
    CategoryDialogComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_LOCALE, useValue: 'RU'},
    DatePipe
  ],
})
export class AdminModule { }
