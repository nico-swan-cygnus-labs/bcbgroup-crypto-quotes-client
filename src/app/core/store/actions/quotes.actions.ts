
import { Action } from '@ngrx/store';
import { Quote } from 'app/core/interfaces/quote.interface';

export const SET_QUOTES = '[Quotes] Set quotes';
export const UPDATE_QUOTES = '[Quotes] Update quotes';
export const SET_SOCKET_CONNECTED = '[Quotes] Set socket connected';
export const UPDATE_QUOTES_API = '[Quotes API] Update crypto quotes from API response';

/**
 * Update the quotes with the latest prices
 */
export class UpdateQuotesFromAPI implements Action {
    readonly type = UPDATE_QUOTES_API;
    quotes: Map<string, Map<string, string>>;
    constructor(public payload?: Map<string, Map<string, string>>) {}
}

/**
 * Set the Status of the websocket connection state
 */
export class SetSocketConnected implements Action {
    readonly type = SET_SOCKET_CONNECTED;
    constructor(public payload?: boolean) {}
}

/**
 * Set the quotes state with the latest prices
 */
export class SetQuotes implements Action {
    readonly type = SET_QUOTES;
    constructor(public payload?: Map<string, Map<string, Quote>>) {}
}

/**
 * Update the quotes with the latest prices
 */
export class UpdateQuotes implements Action {
    readonly type = UPDATE_QUOTES;
    constructor(public payload?: Quote) {}
}


export type Actions = SetSocketConnected | SetQuotes | UpdateQuotes | UpdateQuotesFromAPI;
