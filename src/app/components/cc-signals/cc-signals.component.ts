import { Component, Input, OnInit } from '@angular/core';
import { Signal, TradingSignal } from 'app/core/interfaces/trading-signal.interface';

@Component({
  selector: 'app-cc-signals',
  templateUrl: './cc-signals.component.html',
  styleUrls: ['./cc-signals.component.scss']
})
export class CcSignalsComponent implements OnInit {

  @Input() data: TradingSignal
  overviewSignal: string
  inOutVar: string
  largetxsVar: string
  addressesNetGrowth: string
  concentrationVar: string
  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      const signals: Signal[] =  this.data.signals || undefined;
      if (signals) {
      signals.forEach(signal => {
        switch (signal.name) {
          case 'inOutVar':
            this.inOutVar = signal.sentiment;
            break;
          case 'largetxsVar':
            this.largetxsVar = signal.sentiment;
            break;
          case 'addressesNetGrowth':
            this.addressesNetGrowth = signal.sentiment;
            break;
          case 'concentrationVar':
            this.concentrationVar = signal.sentiment;
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
