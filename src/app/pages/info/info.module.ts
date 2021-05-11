import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CcSignalsComponent as CcSignalsComponent } from 'app/components/cc-signals/cc-signals.component';
import { LineChartComponent } from 'app/components/line-chart/line-chart.component';
import { UiMaterialModule } from '../../ui/ui-material.module';
import { UiModule } from '../../ui/ui.module';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';

@NgModule({
    declarations: [InfoComponent, LineChartComponent,CcSignalsComponent],
    imports: [
        CommonModule, 
        UiMaterialModule, 
        InfoRoutingModule, 
        FontAwesomeModule, 
        FlexLayoutModule,
        NgxChartsModule, 
        UiModule
    ]
})
export class InfoModule {}
