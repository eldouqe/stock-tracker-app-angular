import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSentimentComponent } from './container-sentiment.component';

describe('ContainerSentimentComponent', () => {
  let component: ContainerSentimentComponent;
  let fixture: ComponentFixture<ContainerSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerSentimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
