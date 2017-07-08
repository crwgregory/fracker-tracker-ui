import * as layout from '../actions/layout';
import {Loading} from "../../models/loading";

export interface State {
  showSidenav: boolean;
  loadingEntities: { [ actionType: string ]: Loading };
  loading: boolean;
  subtitle: string;
}

const initialState: State = {
  showSidenav: false,
  loadingEntities: {},
  loading: false,
  subtitle: "",
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        showSidenav: false,
        loadingEntities: state.loadingEntities,
        loading: state.loading,
        subtitle: state.subtitle
      };

    case layout.OPEN_SIDENAV:
      return {
        showSidenav: true,
        loadingEntities: state.loadingEntities,
        loading: state.loading,
        subtitle: state.subtitle
      };

    case layout.LOADING_START:

      const lsp = action.payload;
      const d = Object.assign({}, state.loadingEntities, {[lsp.actionType]: lsp});

      return {
        showSidenav: state.showSidenav,
        loadingEntities: d,
        loading: true,
        subtitle: state.subtitle
      };

    case layout.LOADING_END:
      // only stop loading if all loading entities have been resolved
      if (state.loadingEntities.hasOwnProperty(action.payload)) {
        let loadingEnts = {};
        for (let x in state.loadingEntities) {
          if (!state.loadingEntities.hasOwnProperty(x)) continue;
          if (x != action.payload) {
            loadingEnts[x] = state.loadingEntities[x]
          }
        }
        if (Object.keys(loadingEnts).length === 0) {
          return {
            showSidenav: state.showSidenav,
            loadingEntities: {},
            loading: false,
            subtitle: state.subtitle
          };
        } else {
          return {
            showSidenav: state.showSidenav,
            loadingEntities: loadingEnts,
            loading: state.loading,
            subtitle: state.subtitle
          };
        }
      }
      return state;

    case layout.SET_SUBTITLE:
      return {
        showSidenav: state.showSidenav,
        loadingEntities: state.loadingEntities,
        loading: state.loading,
        subtitle: action.payload
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getIsLoading = (state: State) => state.loading;
export const getSubtitle = (state: State) => state.subtitle;
