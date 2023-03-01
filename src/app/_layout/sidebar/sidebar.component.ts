import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/menuItem';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  isSidebarExpanded$ = this.layoutService.displaySidebar$;
  menuItems: MenuItem[] = [];
  @ViewChild('sidebar') sidebar!: ElementRef;
  routeSub!: Subscription;

  constructor(private layoutService: MainLayoutService,
    private router: Router) { }

  closeSidebar() {
    this.layoutService.closeSidebar();
  }

  onMenuItemClick(item: MenuItem) {

    this.menuItems.map(x => x.selected = false);
    let selectedItem = this.menuItems.find(x => x.path == item.path);
    if (selectedItem)
      selectedItem.selected = true;

    this.closeSidebar();

    this.router.navigate([item.path]);
  }

  ngOnInit(): void {
    this.menuItems = [
      { text: 'Home', icon: 'k-i-home', path: '' },
      { text: 'Projects', icon: 'k-i-check', path: '/projects' },
      { text: 'Mika', icon: 'k-i-graph', path: '' },
    ];

    this.routeSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url;
        let selectedItem = this.menuItems.find(x => x.path === url || (url === '/' && x.path === ''));
        if (selectedItem)
          selectedItem.selected = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
