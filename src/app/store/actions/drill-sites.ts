
import {Action} from "@ngrx/store";
import {DrillSite} from "../../models/drill-site";
export const LOAD = '[Drill Sites] Load';
export const LOAD_COMPLETE = '[Drill Sites] Load Complete';
export const LOAD_ALL = '[Drill Sites] Load All';
export const LOAD_ALL_COMPLETE = '[Drill Sites] Load All Complete';

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: number) { }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_COMPLETE;
  constructor(public payload: DrillSite) { }
}

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;
  constructor(public payload: DrillSite[]) { }
}

export type Actions =
  LoadAction
  | LoadCompleteAction
  | LoadAllAction
  | LoadAllCompleteAction;
