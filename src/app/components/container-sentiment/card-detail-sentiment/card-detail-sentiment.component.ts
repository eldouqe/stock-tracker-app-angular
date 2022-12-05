import { Component, Input, OnInit } from '@angular/core';
import { InsiderSentiment } from '@models/insider-sentiment';

@Component({
  selector: 'app-card-detail-sentiment',
  templateUrl: './card-detail-sentiment.component.html',
  styleUrls: ['./card-detail-sentiment.component.css'],
})
export class CardDetailSentimentComponent implements OnInit {
  insiderSentimentDate: string | null = null;
  _insiderSentiment: InsiderSentiment | null | undefined = null;

  @Input()
  set insiderSentiment(val: InsiderSentiment | null | undefined) {
    this._insiderSentiment = val;
    if (this._insiderSentiment?.year && this._insiderSentiment?.month) {
      this.insiderSentimentDate =
        this._insiderSentiment?.year.toString() +
        '-' +
        this._insiderSentiment?.month.toString() +
        '-01';
    }
  }
  constructor() {}

  ngOnInit(): void {}

  isPositive(change: number | undefined): boolean {
    if (change && change > 0) {
      return true;
    }
    return false;
  }
}
