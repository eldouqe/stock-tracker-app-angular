import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '@models/company';
import { Quote } from '@models/quote';

@Component({
  selector: 'app-card-stock-stats',
  templateUrl: './card-stock-stats.component.html',
  styleUrls: ['./card-stock-stats.component.css'],
})
export class CardStockStatsComponent implements OnInit {
  @Input() company: Company | null = null;
  @Output() deleteCompanyEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  isPourcentagePositive(quote: Quote | undefined): boolean {
    let dp = quote?.dp;
    if (dp && dp > 0) {
      return true;
    }
    return false;
  }

  delete(company: Company | null) {
    if (company) {
      this.deleteCompanyEvent.emit(company);
    }
  }
}
