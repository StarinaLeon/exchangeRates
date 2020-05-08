import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";
import {FetchService} from "../fetch.service";
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  form: FormGroup;

  selectedCurrencies = [];

  selectedPeriod = 'week';

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
        data: []
      }  as any,
      {
        name: 'EUR',
        data: []
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

  constructor(private fetchService: FetchService) {
    this.form = new FormGroup({
      usd: new FormControl(),
      eur: new FormControl()
    })
  }

  ngOnInit(): void {
    this.fetchData()
  }


  private fetchData () {
    this.fetchService.loadRates(this.selectedPeriod, this.selectedCurrencies)
      .then(data => this.updateGraph(data))
  }

  private updateGraph(data) {
    this.chart.ref.update({
      xAxis: {
        categories: data.categories,
      },
      series: [{
        name: 'USD',
        data: data.USD
      } as any,
        {
          name: 'EUR',
          data: data.EUR
        }  as any
      ]
    }, true, true)
  }


  onPeriodChange() {
    this.fetchData();
  }

  onCheckboxChange() {
    this.fetchData();
    console.log(this.form)
  }
}
