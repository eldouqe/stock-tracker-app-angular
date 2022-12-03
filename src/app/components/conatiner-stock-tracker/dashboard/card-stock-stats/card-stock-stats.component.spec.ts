import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStockStatsComponent } from './card-stock-stats.component';

describe('CardStockStatsComponent', () => {
  let component: CardStockStatsComponent;
  let fixture: ComponentFixture<CardStockStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStockStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStockStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
