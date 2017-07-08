import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { of } from 'rxjs/observable/of';

import * as drillsites from '../../store/actions/drill-sites'
import * as errors from '../../store/actions/errors'
import {ApiService} from "../../services/api.service";

@Injectable()
export class DrillSitesEffects {

  @Effect()
  loadDrillSite$: Observable<Action> = this.actions$
    .ofType(drillsites.LOAD)
    .switchMap(loadDrillSiteAction => {
      if (!loadDrillSiteAction) {
        return empty();
      }
      const nextSearch$ = this.actions$.ofType(drillsites.LOAD).skip(1);
      return this.api.getDrillSite(loadDrillSiteAction)
        .takeUntil(nextSearch$)
        .map(data => new drillsites.LoadCompleteAction(data))
        .catch(e => of(new errors.ApiErrorAction(e)));
    });

  @Effect()
  loadDrillSites$: Observable<Action> = this.actions$
    .ofType(drillsites.LOAD_ALL)
    .switchMap(loadDrillSitesAction => {
      if (!loadDrillSitesAction) {
        return empty();
      }
      const nextSearch$ = this.actions$.ofType(drillsites.LOAD_ALL).skip(1);

      return this.api.getDrillSites(loadDrillSitesAction)
        .takeUntil(nextSearch$)
        .map(data => new drillsites.LoadAllCompleteAction(data))
        .catch(e => of(new errors.ApiErrorAction(e)));
    });

  constructor(private actions$: Actions, private api: ApiService) { }
}
