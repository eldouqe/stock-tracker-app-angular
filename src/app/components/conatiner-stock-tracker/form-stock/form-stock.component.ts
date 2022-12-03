import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-stock',
  templateUrl: './form-stock.component.html',
  styleUrls: ['./form-stock.component.css'],
})
export class FormStockComponent implements OnInit {
  @Input() stockTrackerFormGroup!: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  get stockInputFormControl(): FormControl | null {
    return this.stockTrackerFormGroup?.get('stockInput') as FormControl;
  }

  onAdd() {
    console.log('sss');
  }
}
