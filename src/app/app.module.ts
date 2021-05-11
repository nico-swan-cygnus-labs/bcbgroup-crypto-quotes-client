import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { environment } from '../environments/environment';
//import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataStreamService } from './core/data/data-stream.service';
import { DataService } from './core/data/data.service';
import * as fromRoot from './core/store';
import { QuotesEffects } from './core/store/effects/quotes.effects';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxChartsModule,
    EffectsModule.forRoot([QuotesEffects]),
    StoreModule.forRoot(fromRoot.reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [DataService, DataStreamService],
  bootstrap: [AppComponent]
})
export class AppModule { }