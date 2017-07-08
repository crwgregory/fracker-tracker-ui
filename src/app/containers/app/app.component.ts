import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sideNavOpen:boolean = false;

  openSidenav() {
    this.sideNavOpen = true;
  }
  closeSidenav() {
    this.sideNavOpen = false;
  }
}
