import {Action} from "@ngrx/store";
import {ApiError} from "../../models/errors";

export const API_ERROR =  '[Errors] Api';

export class ApiErrorAction implements Action {
  readonly type = API_ERROR;
  constructor(public payload: ApiError) { }
}

export type Actions
  = ApiErrorAction;
