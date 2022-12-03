import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConatinerStockTrackerComponent } from './components/conatiner-stock-tracker/conatiner-stock-tracker.component';
import { FormStockComponent } from './components/conatiner-stock-tracker/form-stock/form-stock.component';
import { DashboardComponent } from './components/conatiner-stock-tracker/dashboard/dashboard.component';
import { CardStockStatsComponent } from './components/conatiner-stock-tracker/dashboard/card-stock-stats/card-stock-stats.component';
import { ArrowStatsUpComponent } from './shared/arrow-stats-up/arrow-stats-up.component';
import { ArrowStatsDownComponent } from './shared/arrow-stats-down/arrow-stats-down.component';
import { CandleComponent } from './shared/components/icons/candle/candle.component';

@NgModule({
  declarations: [AppComponent, ConatinerStockTrackerComponent, FormStockComponent, DashboardComponent, CardStockStatsComponent, ArrowStatsUpComponent, ArrowStatsDownComponent, CandleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
