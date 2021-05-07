import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../../data/data.service';
import * as QuotesActions from '../actions/quotes.actions';

export const GET_QUOTES_API = '[Quotes API] Get crypto quotes';
export const GET_QUOTES_API_SUCCESS = '[Quotes API] Get crypto quotes successful';
export const GET_QUOTES_API_FAIL = '[Quotes API] Get Get crypto quotes failed';

@Injectable()
export class QuotesEffects {
    constructor(private actions$: Actions, private dataService: DataService) {}

    getAllQuotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_QUOTES_API),
            mergeMap(() =>
                this.dataService.getAllQuotes().pipe(
                    map((quotes) => ({ type: QuotesActions.UPDATE_QUOTES_API, payload: quotes })),
                    catchError(() => of({ type: GET_QUOTES_API_FAIL }))
                )
            )
        )
    );
}
