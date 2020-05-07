import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Exchange Rates'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: {
        text: 'Rate (Rub)'
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'USD',
        data: [61.82, 64.10, 74.20, 75.05, 74.76]
      }  as any,
      {
        name: 'EUR',
        data: [68.67, 69.98, 82.14, 82.01, 80.56]
      }  as any
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true
      }
    }
  });

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
