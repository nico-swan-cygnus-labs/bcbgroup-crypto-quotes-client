import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'app/core/interfaces/quote.interface';

@Component({
    selector: 'app-quote-row',
    templateUrl: './quote-row.component.html',
    styleUrls: ['./quote-row.component.scss']
})
export class QuoteRowComponent implements OnInit {
    @Input() quotes: Map<string, Quote>;
    @Input() symbol: string;
    constructor() { }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {}

}
