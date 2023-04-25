import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";
import { TournamentFormDialogComponent } from './tournament-form-dialog/tournament-form-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AngularEditorModule} from "@kolkov/angular-editor";
import { TeamFormDialogComponent } from './team-form-dialog/team-form-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    ProfileComponent,
    TournamentFormDialogComponent,
    TeamFormDialogComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatTabsModule,
        MatCardModule,
        MatRippleModule,
        MatPaginatorModule,
        MatButtonModule,
        TranslateModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        AngularEditorModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        FormsModule,
        MatTableModule
    ]
})
export class ProfileModule { }
