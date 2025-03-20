// attractions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AttractionFormComponent } from './attraction-form/attraction-form.component';
// import { AttractionDeleteDialogComponent } from './attraction-delete-dialog/attraction-delete-dialog.component';
// import { AuthGuard } from '../../core/guards/auth.guard';
import { AttractionListComponent } from './attraction-list/attraction-list.component';
import { AuthGuard } from '../auth.guard';
import { AttractionDeleteDialogComponent } from './attraction-delete-dialog/attraction-delete-dialog.component';

const routes: Routes = [
  { 
    path: 'attractions', 
    component: AttractionListComponent, 
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  declarations: [
    AttractionListComponent,
    AttractionFormComponent,
    AttractionDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class AttractionsModule { }