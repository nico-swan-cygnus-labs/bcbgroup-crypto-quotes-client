import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQuotes from './reducers/quotes.reducer';

/**
 * The over all state for the UI
 * In this application it is storing crypto quotes data
 */
export interface State {
    ui: fromQuotes.State;
}

/**
 * The manipulator for the UI State
 */
export const reducers: ActionReducerMap<State> = {
    ui: fromQuotes.reducer
};

/**
 *  Get the complete state
 * */
export const getUIState = createFeatureSelector<fromQuotes.State>('ui');

/**
 * Get only the socket connection state
 */
export const getSocketStatus = createSelector(getUIState, fromQuotes.getSocketStatus);

/**
 * Get only quotes data
 */
export const getQuotes = createSelector(getUIState, fromQuotes.getQuotes);

/**
 * Get history for a coin
 */
export const getDailyHistoryQuote = createSelector(getUIState, fromQuotes.getDailyHistoryQuote);

/**
 * Get trading signals for a coin
 */
export const getTradingSignals = createSelector(getUIState, fromQuotes.getTradingSignals);
