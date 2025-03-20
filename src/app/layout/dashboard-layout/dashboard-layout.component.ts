import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isMobile = false;
  sidenavOpened = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches)
      )
      .subscribe(matches => {
        this.isMobile = matches;
        this.sidenavOpened = !matches;
      });
  }
  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}