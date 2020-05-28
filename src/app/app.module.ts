import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartModule} from 'angular-highcharts';

import {AppComponent} from './app.component';
import {ChartComponent} from './chart/chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [AppComponent, ChartComponent],
	imports: [BrowserModule, ChartModule, FormsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
