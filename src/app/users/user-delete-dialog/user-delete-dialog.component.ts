import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';

interface DialogData {
  user: User;
}

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.scss'],
  standalone: false
})
export class UserDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
