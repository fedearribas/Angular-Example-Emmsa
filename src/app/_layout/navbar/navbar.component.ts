import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentTheme = 'light-theme';

  items!: MenuItem[]; 
  constructor(private layoutService: MainLayoutService) { }

  ngOnInit() {
    this.items = [
      {
        label: this.currentTheme === 'dark-theme' ? 'Light theme' : 'Dark theme', icon: this.currentTheme === 'dark-theme' ? 'pi pi-fw pi-sun' : 'pi pi-fw pi-moon', command: (event) => {
          this.switchTheme();
          event.item.label = this.currentTheme === 'light-theme' ? 'Dark theme' : 'Light theme';
          event.item.icon = this.currentTheme === 'light-theme' ? 'pi pi-fw pi-moon' : 'pi pi-fw pi-sun';
        }
      }
    ];
  
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  switchTheme() {
    if (this.currentTheme === 'light-theme')
    this.currentTheme = 'dark-theme';
    else
    this.currentTheme = 'light-theme';
    this.layoutService.switchTheme(this.currentTheme);
    
  }


}
