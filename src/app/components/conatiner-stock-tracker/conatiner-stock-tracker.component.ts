import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conatiner-stock-tracker',
  templateUrl: './conatiner-stock-tracker.component.html',
  styleUrls: ['./conatiner-stock-tracker.component.css'],
})
export class ConatinerStockTrackerComponent implements OnInit {
  theForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
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
          ],
        ],
      }),
    });
  }

  get stockTrackerFormGroup(): FormGroup {
    return this.theForm?.get('stockTrackerForm') as FormGroup;
  }
}
