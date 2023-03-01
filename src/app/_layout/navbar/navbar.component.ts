import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ThemeService } from 'src/app/theme.service';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  themeText = '';
  themeIcon = '';
  menuOpened = false;
  clickOutsideMenu$!: Observable<Event>;
  clickOutsideMenuSub!: Subscription;
  isDarkModeSub!: Subscription;

  @ViewChild('menuContent') menuContent!: ElementRef;

  constructor(private layoutService: MainLayoutService,
    private themeService: ThemeService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.clickOutsideMenu$ = fromEvent(window, 'click');
    this.clickOutsideMenuSub = this.clickOutsideMenu$.subscribe(e => {
      const element = <HTMLElement>e.target;
      if (element && element.id !== 'menu-icon' && !element.classList.contains('dropdown-content'))
        this.closeMenu();
    });

    this.isDarkModeSub = this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      if (isDarkTheme) {
        this.themeText = this.themeText = 'Light mode';
        this.themeIcon = 'light_mode';
      }
      else
      {
        this.themeText = this.themeText = 'Dark mode';
        this.themeIcon = 'dark_mode';
      }
    });
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.closeMenu();
  }

  toggleMenu() {
    if (!this.menuOpened)
      this.openMenu();
    else
      this.closeMenu();
  }

  private openMenu() {
    this.renderer.setStyle(this.menuContent.nativeElement, 'display', 'block');
    this.menuOpened = true;
  }

  private closeMenu() {
    this.renderer.setStyle(this.menuContent.nativeElement, 'display', 'none');
    this.menuOpened = false;
  }

  ngOnDestroy(): void {
    this.clickOutsideMenuSub.unsubscribe();
    this.isDarkModeSub.unsubscribe();
  }

}
