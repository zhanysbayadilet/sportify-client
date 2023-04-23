import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app.module";
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    LandingPageComponent
  ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            },
            isolate: false
        }),
        MatCardModule,
        MatRippleModule,
    ]
})
export class LandingModule { }
