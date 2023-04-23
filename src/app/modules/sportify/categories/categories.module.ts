import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {FilterCategoryPipe} from "./category-list/filter-category.pipe";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    CategoryListComponent,
    FilterCategoryPipe
  ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        MatRippleModule
    ]
})
export class CategoriesModule { }
