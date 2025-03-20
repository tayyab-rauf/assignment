import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Attraction } from '../../../core/models/attraction.model';

import { finalize } from 'rxjs/operators';
import { AttractionsService } from '../../services/attraction.service';


@Component({
  selector: 'app-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.scss'],
  standalone: false
})
export class AttractionFormComponent implements OnInit {
  attractionForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private attractionsService: AttractionsService,
    private dialogRef: MatDialogRef<AttractionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    if (this.data.attraction) {
      this.isEditMode = true;
      this.attractionForm.patchValue(this.data.attraction);
    }
  }

  initForm(): void {
    this.attractionForm = this.fb.group({
      id: [this.data.attraction?.id || null],
      name: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      coverimage: ['https://www.melivecode.com/attractions/1.jpg'],
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.attractionForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const attractionData = this.attractionForm.value;

    const apiCall = this.isEditMode
      ? this.attractionsService.updateAttraction(attractionData)
      : this.attractionsService.createAttraction(attractionData);

    apiCall
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error : any) => {
          console.error('Error saving attraction:', error);
          this.errorMessage = 'Failed to save attraction. Please try again.';
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}