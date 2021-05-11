import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'app/core/data/data.service';
import { SymbolHistory } from 'app/core/interfaces/symbol-history.interface';
import { TradingSignal } from 'app/core/interfaces/trading-signal.interface';
import * as QuotesActions from 'app/core/store/actions/quotes.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../../core/store';

@Component({
    selector: 'app-info',
    templateUrl: './Info.component.html',
    styleUrls: ['./Info.component.scss']
})
export class InfoComponent implements OnInit {
    history$: Observable<Map<string, SymbolHistory>>;
    signals$: Observable<Map<string, TradingSignal>>;
    symbol: string;

    constructor(
        private dataService: DataService,
        private store: Store<fromRoot.State>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const props = { 
            symbol: routeParams.get('symbol'), 
            currency: routeParams.get('currency'), 
            length: 30 
        };
        this.symbol = props.symbol;

        this.history$ = this.store
            .select(fromRoot.getDailyHistoryQuote)
            .pipe(map((history: Map<string, SymbolHistory>) => history));
     
        this.dataService.getDailyHistoryQuote(props.symbol, props.currency, props.length)
            .pipe(map((history: SymbolHistory) =>  new QuotesActions.UpdateHistoryFromAPI(history)))
            .subscribe(this.store);

        this.signals$ = this.store
            .select(fromRoot.getTradingSignals)
            .pipe(map((signals: Map<string, TradingSignal>) =>signals));

        this.dataService.getTradingSignals(props.symbol)
            .pipe(map((signals) => new QuotesActions.UpdateTradingSignalsFromAPI(signals) ))
            .subscribe(this.store);  
    }
}
