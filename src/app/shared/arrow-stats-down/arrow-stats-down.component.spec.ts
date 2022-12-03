import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowStatsDownComponent } from './arrow-stats-down.component';

describe('ArrowStatsDownComponent', () => {
  let component: ArrowStatsDownComponent;
  let fixture: ComponentFixture<ArrowStatsDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowStatsDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowStatsDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
