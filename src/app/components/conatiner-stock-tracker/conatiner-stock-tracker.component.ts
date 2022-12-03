import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';

@Component({
  selector: 'app-conatiner-stock-tracker',
  templateUrl: './conatiner-stock-tracker.component.html',
  styleUrls: ['./conatiner-stock-tracker.component.css'],
})
export class ConatinerStockTrackerComponent implements OnInit {
  theForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private stockTrackerService: StockTrackerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.stockTrackerService
      .getCurrentStockBySymbol('AAPL')
      .subscribe((res) => {
        console.log('res', res);
      });
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
