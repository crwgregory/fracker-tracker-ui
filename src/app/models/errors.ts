export interface Error {
  time: number;
  message: string; // a user friendly error message
  error: string; // a debug error message
}

export interface ApiError extends Error {
  status_code: number;
  generic_message: string; // used if app is in production and retrieved from a generic set of status messages in the reducer.
  previous: string; // returned if the api is in verbose mode
  stack: string;
}

export const isApiError = (e: any): e is ApiError => {
  return 'status_code' in e && 'generic_message' in e && 'previous' in e
};
