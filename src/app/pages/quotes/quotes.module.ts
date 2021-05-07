import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuotePriceComponent } from 'app/components/quote-price/quote-price.component';
import { QuoteRowComponent } from 'app/components/quote-row/quote-row.component';
import { UiMaterialModule } from '../../ui/ui-material.module';
import { UiModule } from '../../ui/ui.module';
import { QuotesPageRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';

@NgModule({
    declarations: [QuotesComponent, QuotePriceComponent, QuoteRowComponent],
    imports: [CommonModule, UiMaterialModule, QuotesPageRoutingModule, FontAwesomeModule, FlexLayoutModule, UiModule]
})
export class QuotesModule {}
