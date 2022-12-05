import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-stats',
  templateUrl: './arrow-stats.component.html',
  styleUrls: ['./arrow-stats.component.css'],
})
export class ArrowStatsComponent implements OnInit {
  @Input() arrow: string | null = null;

  @Input() height: string = '111px';
  constructor() {}

  ngOnInit(): void {}
}
