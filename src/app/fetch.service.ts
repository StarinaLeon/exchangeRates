import {Injectable} from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor() {}

  private static getURL(period) {
    const endDate = moment().format('YYYY-MM-DD');
    let startDate;
    if (period === 'month') {
      startDate = moment().subtract(1, 'month').format('YYYY-MM-DD')
    } else if (period === 'week') {
      startDate = moment().subtract(1, 'week').format('YYYY-MM-DD')
    } else if (period === 'year') {
      startDate = moment().subtract(1, 'year').format('YYYY-MM-DD')
    }

    return `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=RUB`
  }

  loadRates(period) {
    const CURRENT_DAY = moment().date();

    return fetch(FetchService.getURL(period))
      .then(response => response.json())
      .then(data => {
        // console.log(data.rates)
        let dates = Object.keys(data.rates).sort().filter(date => {
          if (period !== 'year') {
            return true
          } else {
            const currentDate = moment(date,'YYYY-MM-DD');
            return  currentDate.date() === CURRENT_DAY
          }
        });
        console.log(dates)
        const USDRates = dates.map(date => +(1 / data.rates[date].USD).toFixed(2))
        const EURRates = dates.map(date => +(1 / data.rates[date].EUR).toFixed(2))
        // console.log(USDRates, EURRates);
        return {categories: dates, USD: USDRates, EUR: EURRates}
      })
  }
}
