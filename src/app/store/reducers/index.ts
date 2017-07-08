import * as fromDrillSites from './drill-sites'
import * as fromLayout from './layout'
import { createSelector } from "reselect";

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from "@ngrx/core/compose";
import {storeFreeze} from "ngrx-store-freeze";


export interface State {
  drillSites: fromDrillSites.State;
  layout: fromLayout.State
}

const reducers = {
  drillSites: fromDrillSites.reducer,
  layout: fromLayout.reducer,
};

const buildReducer: ActionReducer<State> = combineReducers(reducers);
const devReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return devReducers(state, action);
  // return buildReducer(state, action)
}

export const getDrillSitesState = (state: State) => state.drillSites;
export const getDrillSites = createSelector(getDrillSitesState, fromDrillSites.getSites);

export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
export const getIsLoading = createSelector(getLayoutState, fromLayout.getIsLoading);
export const getSubtitle = createSelector(getLayoutState, fromLayout.getSubtitle);
