import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DrillSitesComponent} from "./containers/drill-sites/drill-sites.component";
import {HomeComponent} from "./containers/home/home.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'drill-sites',
        component: DrillSitesComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
