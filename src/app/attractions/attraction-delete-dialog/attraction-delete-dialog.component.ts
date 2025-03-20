import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Attraction } from '../../../core/models/attraction.model';

// interface DialogData {
//   attraction: Attraction;
// }

@Component({
  selector: 'app-attraction-delete-dialog',
  templateUrl: './attraction-delete-dialog.component.html',
  styleUrls: ['./attraction-delete-dialog.component.scss'],
  standalone: false
})
export class AttractionDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AttractionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
