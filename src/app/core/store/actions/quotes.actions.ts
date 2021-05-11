
import { Action, createAction, props } from '@ngrx/store';
import { Quote } from 'app/core/interfaces/quote.interface';
import { SymbolHistory } from 'app/core/interfaces/symbol-history.interface';

export const SET_QUOTES = '[Quotes] Set quotes';
export const UPDATE_QUOTES = '[Quotes] Update quotes';
export const SET_SOCKET_CONNECTED = '[Quotes] Set socket connected';
export const UPDATE_QUOTES_API = '[Quotes API] Update crypto quotes from API response';
export const UPDATE_HISTORY_API = '[Quotes API] Update crypto history from API response';
export const UPDATE_TRADING_SIGNAL_API = '[Quotes API] Update crypto trading signal from API response';

export const GET_QUOTES_API = '[Quotes API] Get crypto quotes';
export const GET_QUOTES_API_SUCCESS = '[Quotes API] Get crypto quotes successful';
export const GET_API_FAIL = '[Quotes API] Call failed failed';

export const GET_DAILY_HISTORY_API = '[Quotes API] Get daily history for symbol';
export const GET_TRADING_SIGNALS_API= '[Quotes API] Get trading signals for symbol';


/**
 * Update the quotes with the latest prices
 */
export class UpdateQuotesFromAPI implements Action {
    readonly type = UPDATE_QUOTES_API;
    quotes: Map<string, Map<string, string>>;
    constructor(public payload?: Map<string, Map<string, string>>) {}
}

/**
 * Update the history with the latest prices
 */
export class UpdateHistoryFromAPI implements Action {
    readonly type = UPDATE_HISTORY_API;
    constructor(public payload?: SymbolHistory) {}
}

/**
 * Update the trading signals with the latest prices
 */
export class UpdateTradingSignalsFromAPI implements Action {
    readonly type = UPDATE_TRADING_SIGNAL_API;
    constructor(public payload?: any) {}
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
export class UpdateQuote implements Action {
    readonly type = UPDATE_QUOTES;
    constructor(public payload?: Quote) {}
}

/**
 * Get history for symbol currency pair
 */
export class GetDailyHistory implements Action {
    readonly type = GET_DAILY_HISTORY_API;
    constructor(public symbol: string, public currency: string, public length: number ) {}
}

/**
 * Get history for symbol currency pair
 */
export class GetTradingSignals implements Action {
    readonly type = GET_TRADING_SIGNALS_API;
    constructor(public symbol: string ) {}
}


export const getDailyHistory = createAction(
  GET_DAILY_HISTORY_API,
  props<{ symbol: string, currency: string, length: number }>()
);

export const getTradingSignals = createAction(
  GET_TRADING_SIGNALS_API,
  props<{ symbol: string }>()
);


export type Actions = 
    SetSocketConnected | 
    SetQuotes | 
    UpdateQuote | 
    UpdateQuotesFromAPI | 
    UpdateTradingSignalsFromAPI |
    UpdateHistoryFromAPI
