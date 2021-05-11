import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { DataService } from '../../data/data.service';
import * as QuotesActions from '../actions/quotes.actions';

export interface GetHistoryRequest { 
    symbol: string, 
    currency: string,
    length: number
 }



@Injectable()
export class QuotesEffects {
    constructor(private actions$: Actions, private dataService: DataService) {}

    getAllQuotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuotesActions.GET_QUOTES_API),
            mergeMap(() =>
                this.dataService.getAllQuotes().pipe(
                    map((quotes) => ({ type: QuotesActions.UPDATE_QUOTES_API, payload: quotes })),
                    catchError(() => of({ type: QuotesActions.GET_API_FAIL }))
                )
            )
        )
    );

    

    getDailyHistoryQuote$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuotesActions.GET_DAILY_HISTORY_API),
            mergeMap((action: GetHistoryRequest) => {
                const symbol = action.symbol;
                const currency = action.currency;
                const length = action.length;
                return this.dataService.getDailyHistoryQuote(symbol, currency, length).pipe(
                    map((history) => (
                        { type: QuotesActions.UPDATE_HISTORY_API, payload: history })),
                    catchError(() => of({ type: QuotesActions.GET_API_FAIL }))
                ); 
            }),  
        )
    });

    getTradingSignals$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuotesActions.getTradingSignals),
            mergeMap( action  => {
            return this.dataService.getTradingSignals(action.symbol).pipe(
                map((signals) => ({ type: QuotesActions.UPDATE_TRADING_SIGNAL_API, payload: signals })),
                catchError(() => of({ type: QuotesActions.GET_API_FAIL }))
            ); 
            }),  
        )
    });
}


