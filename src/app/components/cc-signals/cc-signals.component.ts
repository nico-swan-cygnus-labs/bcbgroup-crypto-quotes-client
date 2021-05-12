import { Component, Input, OnInit } from '@angular/core';
import { Signal, TradingSignal } from 'app/core/interfaces/trading-signal.interface';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-cc-signals',
  templateUrl: './cc-signals.component.html',
  styleUrls: ['./cc-signals.component.scss']
})
export class CcSignalsComponent implements OnInit {

  @Input() data: TradingSignal;
  overviewSignal: string;
  inOutVar: string;
  largetxsVar: string;
  addressesNetGrowth: string;
  concentrationVar: string;

  inOutVarChartData: any[];
  largetxsVarChartData: any[];
  addressesNetGrowthChartData: any[];
  concentrationVarChartData: any[];

  view: any[] = [200, 150];
  legend: boolean = false;
  showText: boolean = false;
  angleSpan: number = 180;
  startAngle: number = -90;
  max:number = 1;
  showAxis: boolean = false;

  colorScheme = {
    domain: ['#0060f5']
  };

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      const signals: Signal[] =  this.data.signals || undefined;
      if (signals) {
      signals.forEach(signal => {
        switch (signal.name) {
          case 'inOutVar':
            this.inOutVar = signal.sentiment;
            this.inOutVarChartData = [{ name: "inOutVar", value: signal.score }];
            break;
          case 'largetxsVar':
            this.largetxsVar = signal.sentiment;
            this.largetxsVarChartData = [{ name: "largetxsVar", value: signal.score }];
            break;
          case 'addressesNetGrowth':
            this.addressesNetGrowth = signal.sentiment;
            this.addressesNetGrowthChartData = [{ name: "addressesNetGrowth", value: signal.score }];
            break;
          case 'concentrationVar':
            this.concentrationVar = signal.sentiment;
            this.concentrationVarChartData = [{ name: "concentrationVar", value: signal.score }];
            break;      
        } 
      });
      this.calcSentiment();
    }
  }
  }

  calcSentiment() {
    var sentimentValue = function (_type: string) {
       switch (_type) {
         case 'neutral':
           return 0;
        case 'bearish':
           return -1;
        case 'bullish':
           return 1;
         default:
           return 0;
       }
    } 
    const calcValue = sentimentValue(this.addressesNetGrowth) +
                           sentimentValue(this.concentrationVar) + 
                           sentimentValue(this.inOutVar) + 
                           sentimentValue(this.largetxsVar);
    if (calcValue > 0) {
      this.overviewSignal = 'Bullish';
    } else if (calcValue < 0 ) {
      this.overviewSignal = 'Bearish'; 
    } else {
      this.overviewSignal = 'Neutral';
    }                                         
  }

}
