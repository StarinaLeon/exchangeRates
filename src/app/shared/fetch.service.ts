import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {DATE_FORMAT} from './constants';

@Injectable({
	providedIn: 'root'
})
export class FetchService {
	constructor() {}

	private static getURL(period) {
		const endDate = moment().format(DATE_FORMAT);
		let startDate;
		if (period === 'month') {
			startDate = moment()
				.subtract(1, 'month')
				.format(DATE_FORMAT);
		} else if (period === 'week') {
			startDate = moment()
				.subtract(1, 'week')
				.format(DATE_FORMAT);
		} else if (period === 'year') {
			startDate = moment()
				.subtract(1, 'year')
				.format(DATE_FORMAT);
		}

		return `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=RUB`;
	}

	loadRates(params: {usd: boolean; eur: boolean; period: string}) {
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
							const currentDate = moment(date, DATE_FORMAT);
							return currentDate.date() === CURRENT_DAY;
						}
					});

				const USDRates = dates.map((date) => +(1 / data.rates[date].USD).toFixed(2));
				const EURRates = dates.map((date) => +(1 / data.rates[date].EUR).toFixed(2));
				const result: {
					categories;
					USD?;
					EUR?;
				} = {categories: dates};
				if (params.usd) {
					result.USD = USDRates;
				}
				if (params.eur) {
					result.EUR = EURRates;
				}
				return result;
			});
	}
}
