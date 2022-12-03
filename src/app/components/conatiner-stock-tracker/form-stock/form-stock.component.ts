import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-stock',
  templateUrl: './form-stock.component.html',
  styleUrls: ['./form-stock.component.css'],
})
export class FormStockComponent implements OnInit {
  @Input() stockTrackerFormGroup!: FormGroup;
  @Output() storeEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  get stockInputFormControl(): FormControl | null {
    return this.stockTrackerFormGroup?.get('stockInput') as FormControl;
  }

  onAdd() {
    let stockInputValue: string | null = this.stockInputFormControl?.value;
    if (
      stockInputValue &&
      stockInputValue.length > 0 &&
      stockInputValue.length < 6
    ) {
      this.storeEvent.emit(stockInputValue);
      this.stockTrackerFormGroup.reset();
    }
  }
}
