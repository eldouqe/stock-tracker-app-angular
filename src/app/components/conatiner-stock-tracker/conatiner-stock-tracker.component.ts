import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '@models/company';
import { JsService } from 'src/app/_core/services/js.service';
import { StockTrackerService } from 'src/app/_core/services/stock-tracker.service';

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
    private stockTrackerService: StockTrackerService,
    private jsService: JsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getStocksCompanies();
  }

  getStocksCompanies(): void {
    let symbols = this.stockTrackerService.getSymbols();
    this.companies = [];
    if (symbols.length > 0) {
      this.stockTrackerService
        .getCurrentStocksbySymbols(symbols)
        .subscribe((res) => {
          this.companies = res;
          console.log(this.companies);
        });
    }
  }

  private buildForm(): void {
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

  store(symbol: string): void {
    if (this.stockTrackerService.store(symbol)) {
      this.getStocksCompanies();
    }
  }

  delete(company: Company | null): void {
    if (company) {
      this.companies = this.jsService.spread(
        this.jsService.deleteObjectElementFromArrayByKey(
          this.companies,
          company,
          'symbol'
        )
      );
      this.stockTrackerService.storeAllCompanies(this.companies);
    }
  }
}
