import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuItems!: MenuItem[];

  constructor(private layoutService: MainLayoutService) { }

  ngOnInit() {
    this.menuItems = [
    ];
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }
  
}
