import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { Company } from 'src/app/_core/models/Company';

@Component({
  selector: 'app-conatiner-stock-tracker',
  templateUrl: './conatiner-stock-tracker.component.html',
  styleUrls: ['./conatiner-stock-tracker.component.css'],
})
export class ConatinerStockTrackerComponent implements OnInit {
  theForm!: FormGroup;
  companies: Company[] = [];
  constructor(
    private fb: FormBuilder,
    private stockTrackerService: StockTrackerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getStocksCompanies();
  }

  getStocksCompanies() {
    let symbols = this.stockTrackerService.getSymbols();
    if (symbols.length > 0) {
      this.stockTrackerService
        .getCurrentStocksbySymbols(symbols)
        .subscribe((res) => {
          this.companies = res;
          console.log(this.companies);
        });
    }
  }

  private buildForm() {
    this.theForm = this.fb.group({
      stockTrackerForm: this.fb.group({
        stockInput: [
          null,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(5),
            Validators.pattern('[a-zA-Z]*'),
          ],
        ],
      }),
    });
  }

  get stockTrackerFormGroup(): FormGroup {
    return this.theForm?.get('stockTrackerForm') as FormGroup;
  }

  store(symbol: string) {
    this.stockTrackerService.store(symbol);
  }
}
