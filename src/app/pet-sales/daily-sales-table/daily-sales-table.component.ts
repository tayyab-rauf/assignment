import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PetSalesDaily } from '../../models/pet-sales.model';
import { PetSalesService } from '../../services/pet-sales.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-daily-sales-table',
  standalone: false,
  templateUrl: './daily-sales-table.component.html',
  styleUrls: ['./daily-sales-table.component.scss']
})
export class DailySalesTableComponent implements OnChanges {
  @Input() selectedDate!: string;
  @Output() error = new EventEmitter<string>();
  
  displayedColumns: string[] = ['date', 'dogs', 'cats', 'birds', 'total'];
  dataSource = new MatTableDataSource<PetSalesDaily>([]);
  isLoading = false;

  constructor(private petSalesService: PetSalesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate) {
      this.loadDailySales();
    }
  }

  loadDailySales(): void {
    this.isLoading = true;
    
    this.petSalesService.getDailySales(this.selectedDate)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          // Wrap the single daily sales data in an array for the table
          this.dataSource.data = [data];
        },
        error: (error) => {
          console.error('Error loading daily sales data:', error);
          this.error.emit('Failed to load daily sales data. Please try again.');
        }
      });
  }
}
