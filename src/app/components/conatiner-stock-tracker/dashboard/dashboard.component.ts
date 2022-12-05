import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '@models/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() companies: Company[] = [];

  @Output() deleteCompanyEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  deleteCompany(company: Company | null): void {
    if (company) {
      this.deleteCompanyEvent.emit(company);
    }
  }
}
