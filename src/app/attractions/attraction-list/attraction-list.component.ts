import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { AttractionFormComponent } from '../attraction-form/attraction-form.component';

import { AttractionDeleteDialogComponent } from '../attraction-delete-dialog/attraction-delete-dialog.component';
import { AttractionsService } from '../../services/attraction.service';


@Component({
  selector: 'app-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.scss'],
  standalone: false
})
export class AttractionListComponent implements OnInit {
  displayedColumns: string[] = ['coverimage', 'id', 'name', 'detail', 'location', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private AttractionsService: AttractionsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAttractions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAttractions(): void {
    this.isLoading = true;
    
    const page = this.paginator?.pageIndex + 1 || 1;
    const limit = this.paginator?.pageSize || 10;
    
    this.AttractionsService.getAttractions(page, limit)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (attractions : any) => {
          this.dataSource.data = attractions;
        },
        error: (error : any) => {
          console.error('Error loading attractions:', error);
          this.showErrorMessage('Failed to load attractions. Please try again.');
        }
      });
  }

  openAttractionForm(attraction?: any): void {
    const dialogRef = this.dialog.open(AttractionFormComponent, {
      width: '500px',
      data: { attraction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAttractions();
      }
    });
  }

  deleteAttraction(attraction: any): void {
    const dialogRef = this.dialog.open(AttractionDeleteDialogComponent, {
      width: '400px',
      data: { attraction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AttractionsService.deleteAttraction(attraction.id)
          .subscribe({
            next: (respo : any) => {
              this.showSuccessMessage(respo.message);
              this.loadAttractions();
            },
            error: (error : any) => {
              console.error('Error deleting attraction:', error);
              this.showErrorMessage('Failed to delete attraction. Please try again.');
            }
          });
      }
    });
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}