import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/menuItem';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarExpanded$ = this.layoutService.displaySidebar$;

  menuItems: Array<MenuItem> = [];

  constructor(private layoutService: MainLayoutService) { }

  ngOnInit(): void {
    this.menuItems = [
      { text: 'Home', icon: 'k-i-home', path: '' },
      { text: 'Projects', icon: 'k-i-check', path: '/projects' },
      { text: 'Mika', icon: 'k-i-graph', path: '' },
    ];
    this.menuItems[0].selected = true;
  }
}
