import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStreamService } from '../../core/data/data-stream.service';
import * as fromRoot from '../../core/store';
import * as QuotesActions from '../../core/store/actions/quotes.actions';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    socketStatus$: Observable<string>;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private store: Store<fromRoot.State>,
        private dataStreamService: DataStreamService
    ) {}

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {
        this.socketStatus$ = this.store
            .select(fromRoot.getSocketStatus)
            .pipe(map((connected: boolean) => (connected ? 'connected' : 'disconnected')));

        this.dataStreamService.connected$
            .pipe(map((connected) => new QuotesActions.SetSocketConnected(connected)))
            .subscribe(this.store);
    }
}
