import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { DrillSitesComponent } from './containers/drill-sites/drill-sites.component';
import {ToolbarComponent} from "./components/toolbar.component";
import {
  MdButtonModule, MdIconModule, MdInputModule, MdListModule, MdSidenavModule,
  MdToolbarModule
} from "@angular/material";
import {NavItemComponent} from "./components/nav-item/nav-item.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './containers/home/home.component';
import {FilterListComponent} from "./components/filter-list.component";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {reducer} from "./store/reducers/index";
import {StoreModule} from "@ngrx/store";
import {ApiService} from "./services/api.service";
import {HttpModule} from "@angular/http";
import {EffectsModule} from "@ngrx/effects";
import {DrillSitesEffects} from "./store/effects/drill-sties";

@NgModule({
  declarations: [
    AppComponent,
    DrillSitesComponent,
    ToolbarComponent,
    NavItemComponent,
    HomeComponent,
    FilterListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 10
    }),
    EffectsModule.run(DrillSitesEffects),
    AppRoutingModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdInputModule
  ],
  entryComponents: [
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
