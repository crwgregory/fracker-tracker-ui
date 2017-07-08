import { Component } from '@angular/core';
import * as fromRoot from '../../store/reducers/index'
import * as layout from '../../store/actions/layout'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSidenav$: Observable<boolean>;
  loading$: Observable<boolean>;
  subtitle$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loading$ = this.store.select(fromRoot.getIsLoading);
    this.subtitle$ = this.store.select(fromRoot.getSubtitle);
  }

  openSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.OpenSidenavAction());
  }
  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenavAction());
  }
}
