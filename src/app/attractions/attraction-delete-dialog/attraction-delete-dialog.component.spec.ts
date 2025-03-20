import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionDeleteDialogComponent } from './attraction-delete-dialog.component';

describe('AttractionDeleteDialogComponent', () => {
  let component: AttractionDeleteDialogComponent;
  let fixture: ComponentFixture<AttractionDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttractionDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
