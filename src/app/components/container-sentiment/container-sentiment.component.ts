import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '@models/company';
import { InsiderSentiment } from '@models/insider-sentiment';
import { NgxSpinnerService } from 'ngx-spinner';
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
  company: Company | null = null;
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
    if (this.paramSymbol) {
      this.getInsiderSentimentCompanyBySymbole(this.paramSymbol);
    }
  }

  getInsiderSentimentCompanyBySymbole(symbol: string) {
    const dateFrom = this.datepipe.transform(
      this.jsService.getDatePriortoTodayByNumberMonth(3),
      'yyyy-MM-dd'
    );
    const dateTo = this.datepipe.transform(
      this.jsService.getDatePriortoTodayByNumberMonth(1),
      'yyyy-MM-dd'
    );
    if (dateFrom && dateTo && symbol) {
      this.stockTrackerService
        .getInsiderSentimentWithCompanyBySymbole(symbol, dateFrom, dateTo)
        .subscribe((res: Company) => {
          console.log('re', res);
          this.company = res;
        });
    }
  }

  isExistsInsiderSentimentByIndex(
    i: number,
    insiderSentiment: InsiderSentiment[] | undefined
  ): boolean {
    if (insiderSentiment?.[i] !== undefined) {
      return true;
    }
    return false;
  }

  getInsiderSentimentByIndex(
    i: number,
    insiderSentiment: InsiderSentiment[] | undefined
  ): InsiderSentiment | undefined {
    return insiderSentiment?.[i];
  }
}
