import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySalesTableComponent } from './daily-sales-table.component';

describe('DailySalesTableComponent', () => {
  let component: DailySalesTableComponent;
  let fixture: ComponentFixture<DailySalesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailySalesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailySalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
