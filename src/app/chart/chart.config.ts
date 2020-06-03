export const chartDefaultConfig = {
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
	series: [],
	plotOptions: {
		line: {
			dataLabels: {
				enabled: true
			},
			enableMouseTracking: true
		}
	}
};
