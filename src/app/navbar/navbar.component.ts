import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuItems!: MenuItem[];
  @Output() onToggleSidebar = new EventEmitter();

  ngOnInit() {
    this.menuItems = [
    ];
  }

  toggleSidebar() {
    this.onToggleSidebar.emit();
  }
  
}
