import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatinerStockTrackerComponent } from './conatiner-stock-tracker.component';

describe('ConatinerStockTrackerComponent', () => {
  let component: ConatinerStockTrackerComponent;
  let fixture: ComponentFixture<ConatinerStockTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConatinerStockTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConatinerStockTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
