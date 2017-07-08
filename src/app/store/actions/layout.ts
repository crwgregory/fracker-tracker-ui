import { Action } from '@ngrx/store';
import {Loading} from "../../models/loading";

export const OPEN_SIDENAV =   '[Layout] Open Sidenav';
export const CLOSE_SIDENAV =  '[Layout] Close Sidenav';
export const LOADING_START =  '[Layout] Loading Start';
export const LOADING_END =  '[Layout] Loading End';
export const SET_SUBTITLE =  '[Layout] Set subtitle';


export class OpenSidenavAction implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class StartLoadingAction implements Action {
  readonly type = LOADING_START;
  public payload: Loading;
  constructor(private actionType: string) {
    this.payload = {
      startTime: Date.now(),
      actionType: actionType
    }
  }
}

export class EndLoadingAction implements Action {
  readonly type = LOADING_END;
  constructor(public payload: string) { }
}

export class SetSubtitleAction implements Action {
  readonly type = SET_SUBTITLE;
  constructor(public payload: string) { }
}

export type Actions
  = OpenSidenavAction
  | CloseSidenavAction
  | StartLoadingAction
  | EndLoadingAction
  | SetSubtitleAction;
