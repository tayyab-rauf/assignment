import { Component } from '@angular/core';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Users', icon: 'people', route: '/users' },
    { label: 'Attractions', icon: 'location_on', route: '/attractions' },
    { label: 'Pet Sales', icon: 'pets', route: '/pet-sales' }
  ];
}