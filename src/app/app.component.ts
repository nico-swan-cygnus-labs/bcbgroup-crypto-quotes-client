import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './core/store';
import { GET_QUOTES_API } from './core/store/effects/quotes.effects';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
    constructor(private store: Store<fromRoot.State>) {}

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void {
        // Request to get all default quotes update with Application started
        this.store.dispatch({ type: GET_QUOTES_API });
    }
}
