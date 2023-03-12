import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { sidebarTextAnimation } from 'src/app/app.animation';
import { MenuItem } from 'src/app/shared/models/menu-item';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarTextAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {

  isSidebarExpanded$ = this.layoutService.displaySidebar$;
  
  @ViewChild('sidebar') sidebar!: ElementRef;
  routeSub!: Subscription;

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([
    { text: 'Home', icon: 'k-i-home', path: '' },
    { text: 'Projects', icon: 'k-i-check', path: '/projects' },
    { text: 'Mika', icon: 'k-i-graph', path: '' },
  ]);
  
  private get menuItemsValue() {
    return [...this.menuItemsSubject.value];
  }

  menuItems$ = this.menuItemsSubject.asObservable();

  constructor(private layoutService: MainLayoutService,
    private router: Router) { }

  closeSidebar() {
    this.layoutService.closeSidebar();
  }

  onMenuItemClick(item: MenuItem) {
    this.closeSidebar();
    this.router.navigate([item.path]);
  }

  ngOnInit(): void {

    this.routeSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url;
        let items = this.menuItemsValue;
        
        let selectedItem = items.find(x => x.path === url || (url === '/' && x.path === ''));
        if (!selectedItem) {
          if (url.includes('/projects/'))
            selectedItem = items.find(x => x.text === 'Projects');
        }
        if (selectedItem) {
          items.map(x => x.selected = false);
          selectedItem.selected = true;
          this.menuItemsSubject.next(items);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
