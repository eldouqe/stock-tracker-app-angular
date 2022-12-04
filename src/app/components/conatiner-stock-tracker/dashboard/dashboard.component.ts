import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/_core/models/Company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() companies: Company[] = [];
  constructor() {}

  ngOnInit(): void {}
}
