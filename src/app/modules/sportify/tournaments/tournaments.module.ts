import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    TournamentListComponent,
    TournamentDetailComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    TranslateModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_LOCALE, useValue: 'RU'},
    DatePipe
  ],
})
export class TournamentsModule { }
