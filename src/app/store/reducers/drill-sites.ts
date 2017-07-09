import {DrillSite} from "../../models/drill-site";
import * as drillsites from "../actions/drill-sites"
import {createSelector} from "reselect";

export interface State {
  ids: number[],
  entities: { [id: number]: DrillSite }
}

export const initialState: State = {
  ids: [],
  entities: {},
};


export function reducer(state = initialState, action: drillsites.Actions): State {
  switch (action.type) {

    case drillsites.LOAD_ALL_COMPLETE:

      const loadALlPayload = action.payload;


      const newDrillSites = loadALlPayload.filter(site => !state.entities[site.id]);

      const newSiteIds = newDrillSites.map(a => a.id);
      const newSiteEntities = newDrillSites.reduce((entities: {[id:number]:DrillSite}, site: DrillSite) => {
        return Object.assign({}, entities, {
          [site.id]: site
        })
      }, {});

      return {
        ids: [...state.ids, ...newSiteIds],
        entities: Object.assign({}, state.entities, newSiteEntities),
      };

    default:
      return state
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getSites = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id])
});
