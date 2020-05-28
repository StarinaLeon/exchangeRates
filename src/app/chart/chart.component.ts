import {Component, OnInit} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {FetchService} from '../fetch.service';
import {FormGroup, FormControl} from '@angular/forms';

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
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
			} as any,
			{
				name: 'EUR',
				data: []
			} as any
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
		this.createFiltersForm();
	}

	ngOnInit(): void {
		this.fetchData();
	}

	private createFiltersForm() {
		this.form = new FormGroup({
			usd: new FormControl(true),
			eur: new FormControl(false),
			period: new FormControl('week')
		});

		this.form.valueChanges.subscribe(this.fetchData.bind(this));
	}

	private fetchData() {
		this.fetchService.loadRates(this.form.getRawValue()).then((data) => this.updateGraph(data));
	}

	private updateGraph(data) {
    const series = [];

	  if (data.USD) {
	    series.push({
        name:'USD',
        data: data.USD,
      })

    }

    if (data.EUR) {
      series.push({
        name: 'EUR',
        data: data.EUR
      })
    }

    console.log(series)
		this.chart.ref.update(
			{
				xAxis: {
					categories: data.categories
				},
				series
			},
			true,
			true
		);
	}
}
