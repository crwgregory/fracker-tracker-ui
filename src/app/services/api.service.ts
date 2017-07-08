import {Injectable, isDevMode} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/take';
import {Store} from "@ngrx/store";
import * as fromRoot from "../store/reducers";
import * as drillsites from "../store/actions/drill-sites"
import * as layout from "../store/actions/layout"
import {DrillSite} from "../models/drill-site";
import {ApiError} from "../models/errors";


@Injectable()
export class ApiService {
  private API_PATH: string = 'http://localhost:8080';

  constructor(private http: Http, private store: Store<fromRoot.State>) {}

  startLoading(actionType: string):void {
    this.store.dispatch(new layout.StartLoadingAction(actionType));
  }

  endLoading(actionType: string):void {
    this.store.dispatch(new layout.EndLoadingAction(actionType));
  }

  getDrillSite(action: drillsites.LoadAction): Observable<DrillSite> {
    this.startLoading(action.type);
    return this.http.get(`${this.API_PATH}/drill-sites/${action.payload}`)
      .map(res => {
        return res.json().data || null
      })
      .catch(this.handleError)
      .finally(() => this.endLoading(action.type));
  }

  getDrillSites(action: drillsites.LoadAllAction): Observable<DrillSite[]> {
    this.startLoading(action.type);
    return this.http.get(`${this.API_PATH}/drill-sites`)
      .map(res => {
        return res.json().data || []
      })
      .catch(this.handleError)
      .finally(() => this.endLoading(action.type));
  }

  handleError (error: Response | any) {
    let errMsg: string;
    let apiErr: ApiError;
    if (error instanceof Response) {
      const body = error.json() || '';
      const genMsg = ApiService.getStatusMessage(error.status);
      apiErr = {
        error: body.error || '',
        message: body.message || '',
        previous: body.previous || '',
        stack: body.stack || '',
        status_code: error.status,
        generic_message: genMsg,
        time: Date.now()
      };
      if (isDevMode()) {
        console.error(apiErr)
      }
      return Observable.throw(apiErr);
    } else {
      errMsg = error.message ? error.message : error.toString();
      if (isDevMode()) {
        console.error(errMsg);
      }
      return Observable.throw(errMsg);
    }
  }

  static getStatusMessage(sc: number): string {
    return STATUS_CODES[sc]
  }
}

const STATUS_CODES = {
  100 : 'Continue',
  101 : 'Switching Protocols',
  102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
  200 : 'OK',
  201 : 'Created',
  202 : 'Accepted',
  203 : 'Non-Authoritative Information',
  204 : 'No Content',
  205 : 'Reset Content',
  206 : 'Partial Content',
  207 : 'Multi-Status',               // RFC 4918
  208 : 'Already Reported',
  226 : 'IM Used',
  300 : 'Multiple Choices',
  301 : 'Moved Permanently',
  302 : 'Found',
  303 : 'See Other',
  304 : 'Not Modified',
  305 : 'Use Proxy',
  307 : 'Temporary Redirect',
  308 : 'Permanent Redirect',         // RFC 7238
  400 : 'Bad Request',
  401 : 'You are not authorized to request this resource.',
  402 : 'Payment Required',
  403 : 'You are forbidden to request this resource.',
  404 : 'The requested data could not be found.',
  405 : 'Method Not Allowed',
  406 : 'Not Acceptable',
  407 : 'Proxy Authentication Required',
  408 : 'The request timed out. Please try again soon.',
  409 : 'Conflict',
  410 : 'Gone',
  411 : 'Length Required',
  412 : 'Precondition Failed',
  413 : 'Payload Too Large',
  414 : 'URI Too Long',
  415 : 'Unsupported Media Type',
  416 : 'Range Not Satisfiable',
  417 : 'Expectation Failed',
  418 : 'I\'m a teapot',              // RFC 2324
  421 : 'Misdirected Request',
  422 : 'Unprocessable Entity',       // RFC 4918
  423 : 'Locked',                     // RFC 4918
  424 : 'Failed Dependency',          // RFC 4918
  425 : 'Unordered Collection',       // RFC 4918
  426 : 'Upgrade Required',           // RFC 2817
  428 : 'Precondition Required',      // RFC 6585
  429 : 'Too Many Requests',          // RFC 6585
  431 : 'Request Header Fields Too Large',// RFC 6585
  500 : 'Internal Server Error',
  501 : 'Not Implemented',
  502 : 'Bad Gateway',
  503 : 'Service Unavailable',
  504 : 'Gateway Timeout',
  505 : 'HTTP Version Not Supported',
  506 : 'Variant Also Negotiates',    // RFC 2295
  507 : 'Insufficient Storage',       // RFC 4918
  508 : 'Loop Detected',
  509 : 'Bandwidth Limit Exceeded',
  510 : 'Not Extended',               // RFC 2774
  511 : 'Network Authentication Required' // RFC 6585
};

