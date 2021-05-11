import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { SymbolHistory } from 'app/core/interfaces/symbol-history.interface';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() data: SymbolHistory
  chartData: any;
  view: any[];
  currency: string;

  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  curve:any = shape.curveCardinal.tension(0);

  colorScheme = {
    domain: ['#0060f5']
  };

  constructor(private containerRef: ViewContainerRef ) { }

  ngOnInit(): void {
    this.populateChartData(this.data);
    this.view = [innerWidth / 1.3, 400];
  }

  populateChartData(_data) {
    const data = _data.value;
    this.currency = data.currency;
    let chartData: any = [];
    data.data.forEach(chartPoint => {
      let date = new Date( chartPoint.time * 1000);
      chartData.push({
        name: date.toDateString(),
        value :chartPoint.value
      });
    });
    
    this.chartData = [
      {
        "name": data.currency,
        "series": chartData
      }
    ];
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
