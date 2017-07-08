import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drill-sites',
  templateUrl: './drill-sites.component.html',
  styleUrls: ['./drill-sites.component.css']
})
export class DrillSitesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  filterList(query) {
    console.log(query)
  }
}
