import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowStatsUpComponent } from './arrow-stats-up.component';

describe('ArrowStatsUpComponent', () => {
  let component: ArrowStatsUpComponent;
  let fixture: ComponentFixture<ArrowStatsUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowStatsUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowStatsUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
