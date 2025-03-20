import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PetSalesComponent } from './pet-sales/pet-sales.component';

import { AuthGuard } from '../auth.guard';
// import { WeeklySalesChartComponent } from './weekly-sales-chart/weekly-sales-chart.component';
// import { DailySalesTableComponent } from './daily-sales-table/daily-sales-table.component';
import { BaseChartDirective } from 'ng2-charts';

const routes: Routes = [
  { 
    path: 'pet-sales', 
    component: PetSalesComponent, 
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  declarations: [
    PetSalesComponent,
    // WeeklySalesChartComponent,
    // DailySalesTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BaseChartDirective
  ]
})
export class PetSalesModule { }