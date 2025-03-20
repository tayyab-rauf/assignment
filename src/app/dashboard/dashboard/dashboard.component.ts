import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

interface DashboardTile {
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  cols = 4;
  dashboardTiles: DashboardTile[] = [
    {
      title: 'Users',
      subtitle: 'Manage system users',
      icon: 'people',
      route: '/users',
      color: '#3f51b5'
    },
    {
      title: 'Attractions',
      subtitle: 'Manage tourist attractions',
      icon: 'location_on',
      route: '/attractions',
      color: '#f44336'
    },
    {
      title: 'Pet Sales',
      subtitle: 'View sales statistics',
      icon: 'pets',
      route: '/pet-sales',
      color: '#4caf50'
    }
  ];

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          return 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          return 3;
        } else {
          return 4;
        }
      })
    ).subscribe(cols => {
      this.cols = cols;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}