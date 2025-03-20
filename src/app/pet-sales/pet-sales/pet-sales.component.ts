import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PetSalesService } from '../../services/pet-sales.service';
import { ChartConfiguration, ChartType, ChartData, Chart } from 'chart.js';

@Component({
  selector: 'app-pet-sales',
  standalone: false,
  templateUrl: './pet-sales.component.html',
  styleUrls: ['./pet-sales.component.scss']
})
export class PetSalesComponent implements OnInit, AfterViewInit {
  weeklySalesData: any; // Raw data from the API
  dailySalesData: any[] = []; // Daily sales data
  selectedDate: string = new Date().toISOString().split('T')[0]; // Default to today's date
  isLoading: boolean = false;
  private chart: any;

  // Chart.js Configuration
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sales Amount'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [], // Will be populated with dates
    datasets: [] // Will be populated with sales data for each animal
  };

  constructor(private petSalesService: PetSalesService) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadWeeklySales(this.selectedDate);
    this.loadDailySales(this.selectedDate);
  }

  ngAfterViewChecked(): void {
    if (this.weeklySalesData) {
      this.updateChartData(this.weeklySalesData);
    }
  }

  loadWeeklySales(date: string): void {
    this.isLoading = true;
    this.petSalesService.getWeeklySales(date).subscribe(
      (response: any) => {
          this.weeklySalesData = response; // API response with `series` and `categories`
          this.updateChartData(response);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching weekly sales:', error);
        this.isLoading = false;
      }
    );
  }

  loadDailySales(date: string): void {
    this.isLoading = true;
    this.petSalesService.getDailySales(date).subscribe(
      (response: any) => {
        this.dailySalesData = response; // Assuming the API returns an array of sales
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching daily sales:', error);
        this.isLoading = false;
      }
    );
  }

  updateChartData(response : any): void {

    if (!response || !response.series || !response.categories) return;

    
    if (this.chart) {
      this.chart.destroy();
    }
    
    // Set the chart labels (dates)
    this.lineChartData = { labels: [], datasets: [] }; 
    this.lineChartData.labels = response.categories;

    // Clear existing datasets
    this.lineChartData.datasets = [];

    // Add a dataset for each animal
    this.weeklySalesData.series.forEach((animalData: any) => {
      this.lineChartData.datasets.push({
        label: animalData.name, // Animal name
        data: animalData.data, // Sales data for the animal
        borderColor: this.getRandomColor(), // Random color for each animal
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light background color
        pointBackgroundColor: '#000',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#000',
        fill: true
      });
    });


  }

  getRandomColor(): string {
    // Generate a random color for each animal's line
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  onDateChange(date: string): void {
      this.selectedDate = date;
      this.loadWeeklySales(date);
      this.loadDailySales(date);
    }
  
}