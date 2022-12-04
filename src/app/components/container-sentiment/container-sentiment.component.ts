import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsService } from 'src/app/_core/services/js.service';
import { StockTrackerService } from 'src/app/_core/services/stock-tracker.service';

@Component({
  selector: 'app-container-sentiment',
  templateUrl: './container-sentiment.component.html',
  styleUrls: ['./container-sentiment.component.css'],
  providers: [DatePipe],
})
export class ContainerSentimentComponent implements OnInit {
  paramSymbol: string | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private stockTrackerService: StockTrackerService,
    private jsService: JsService,
    public datepipe: DatePipe
  ) {
    this.paramSymbol = this.activatedRoute.snapshot.paramMap.get('symbol');
    console.log(this.paramSymbol);
  }

  ngOnInit(): void {
    this.getInsiderSentiment();
  }

  getInsiderSentiment() {
    const dateFrom = this.datepipe.transform(
      this.jsService.getDatePriortoTodayByNumberMonth(3),
      'yyyy-MM-dd'
    );
    const dateTo = this.datepipe.transform(
      this.jsService.getDatePriortoTodayByNumberMonth(1),
      'yyyy-MM-dd'
    );
    if (dateFrom && dateTo && this.paramSymbol) {
      this.stockTrackerService
        .getInsiderSentimentBetweenTwoDatesBySymbol(
          this.paramSymbol,
          dateFrom,
          dateTo
        )
        .subscribe((res) => {
          console.log('re', res);
        });
    }
  }
}
