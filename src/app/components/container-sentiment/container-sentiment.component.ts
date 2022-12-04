import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-container-sentiment',
  templateUrl: './container-sentiment.component.html',
  styleUrls: ['./container-sentiment.component.css'],
})
export class ContainerSentimentComponent implements OnInit {
  paramSymbol: string | null = null;
  constructor(private activatedRoute: ActivatedRoute) {
    this.paramSymbol = this.activatedRoute.snapshot.paramMap.get('symbol');
    console.log(this.paramSymbol);
  }

  ngOnInit(): void {}
}
