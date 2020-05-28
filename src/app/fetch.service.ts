import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class FetchService {
	constructor() {}

	private static getURL(period) {
		const endDate = moment().format('YYYY-MM-DD');
		let startDate;
		if (period === 'month') {
			startDate = moment()
				.subtract(1, 'month')
				.format('YYYY-MM-DD');
		} else if (period === 'week') {
			startDate = moment()
				.subtract(1, 'week')
				.format('YYYY-MM-DD');
		} else if (period === 'year') {
			startDate = moment()
				.subtract(1, 'year')
				.format('YYYY-MM-DD');
		}

		return `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=RUB`;
	}

	loadRates(params) {
		console.log('received new filters', params);

		const CURRENT_DAY = moment().date();

		return fetch(FetchService.getURL(params.period))
			.then((response) => response.json())
			.then((data) => {
				// console.log(data.rates)
				const dates = Object.keys(data.rates)
					.sort()
					.filter((date) => {
						if (params.period !== 'year') {
							return true;
						} else {
							const currentDate = moment(date, 'YYYY-MM-DD');
							return currentDate.date() === CURRENT_DAY;
						}
					});
				const USDRates = dates.map((date) => +(1 / data.rates[date].USD).toFixed(2));
				const EURRates = dates.map((date) => +(1 / data.rates[date].EUR).toFixed(2));
				return {categories: dates, USD: USDRates, EUR: EURRates};
			});
	}
}
