import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Quote } from 'app/core/interfaces/quote.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStreamService } from '../../core/data/data-stream.service';
import * as fromRoot from '../../core/store';
import * as QuotesActions from '../../core/store/actions/quotes.actions';

@Component({
    selector: 'app-quotes',
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
    quotes$: Observable<Map<string, Map<string, Quote>>>;

    constructor(
        private dataStreamService: DataStreamService,
        private store: Store<fromRoot.State>
    ) {}

    ngOnInit() {

        this.quotes$ = this.store
            .select(fromRoot.getQuotes)
            .pipe(map((quote: Map<string, Map<string, Quote>>) => quote));

        this.dataStreamService.cryptoQuotes$
            .pipe(map((quotes) => new QuotesActions.SetQuotes(quotes)))
            .subscribe(this.store);
    }
}
