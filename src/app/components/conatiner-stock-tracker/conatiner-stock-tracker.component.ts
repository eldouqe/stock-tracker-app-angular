import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsService } from 'src/app/_core/services/js.service';
import { StockTrackerService } from 'src/app/_core/services/stock-tracker.service';
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
    private stockTrackerService: StockTrackerService,
    private jsService: JsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getStocksCompanies();
  }

  getStocksCompanies() {
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
    if (this.stockTrackerService.store(symbol)) {
      this.getStocksCompanies();
    }
  }

  delete(company: Company | null) {
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
