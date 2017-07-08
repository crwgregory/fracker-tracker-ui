import { Component, OnInit } from '@angular/core';
import {DrillSite} from "../../models/drill-site";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers/index'

@Component({
  selector: 'app-drill-sites',
  templateUrl: './drill-sites.component.html',
  styleUrls: ['./drill-sites.component.css']
})
export class DrillSitesComponent implements OnInit {

  drillSites: DrillSite[];

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select(fromRoot.getDrillSites).subscribe(sites => {
      this.drillSites = sites;
    });
  }

  filterList(query) {

  }
}
