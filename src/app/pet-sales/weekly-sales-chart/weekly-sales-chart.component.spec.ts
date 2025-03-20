import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySalesChartComponent } from './weekly-sales-chart.component';

describe('WeeklySalesChartComponent', () => {
  let component: WeeklySalesChartComponent;
  let fixture: ComponentFixture<WeeklySalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklySalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklySalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
