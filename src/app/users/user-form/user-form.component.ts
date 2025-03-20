import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

interface DialogData {
  user?: User;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: false
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    if (this.data.user) {
      this.isEditMode = true;
      this.userForm.patchValue(this.data.user);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [this.data.user?.id || null],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      avatar: ['https://www.melivecode.com/users/cat.png']
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const userData = this.userForm.value;

    const apiCall = this.isEditMode
      ? this.userService.updateUser(userData)
      : this.userService.createUser(userData);

    apiCall
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error : any) => {
          console.error('Error saving user:', error);
          this.errorMessage = 'Failed to save user. Please try again.';
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}