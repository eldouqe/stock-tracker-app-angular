import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConatinerStockTrackerComponent } from './components/conatiner-stock-tracker/conatiner-stock-tracker.component';
import { FormStockComponent } from './components/conatiner-stock-tracker/form-stock/form-stock.component';
import { DashboardComponent } from './components/conatiner-stock-tracker/dashboard/dashboard.component';
import { CardStockStatsComponent } from './components/conatiner-stock-tracker/dashboard/card-stock-stats/card-stock-stats.component';
import { CandleComponent } from './_shared/components/icons/candle/candle.component';
import { FinnhubInterceptor } from './_core/interceptors/finnhub.interceptor';
import { CloseComponent } from './_shared/components/icons/close/close.component';
import { ArrowStatsComponent } from './_shared/components/icons/arrow-stats/arrow-stats.component';
import { ContainerSentimentComponent } from './components/container-sentiment/container-sentiment.component';
import { CardDetailSentimentComponent } from './components/container-sentiment/card-detail-sentiment/card-detail-sentiment.component';

@NgModule({
  declarations: [
    AppComponent,
    ConatinerStockTrackerComponent,
    FormStockComponent,
    DashboardComponent,
    CardStockStatsComponent,
    CandleComponent,
    CloseComponent,
    ArrowStatsComponent,
    ContainerSentimentComponent,
    CardDetailSentimentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FinnhubInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
