import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
  isDarkModeSub!: Subscription;

  @ViewChild('menuContent') menuContent!: ElementRef;
  @ViewChild('menuButton') menuButton!: ElementRef;

  constructor(private layoutService: MainLayoutService,
    private themeService: ThemeService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      e.preventDefault();
      if (e.target && e.target !== this.menuContent.nativeElement && e.target !== this.menuButton.nativeElement)
        this.closeMenu();
    });

    this.isDarkModeSub = this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      if (isDarkTheme) {
        this.themeText = this.themeText = 'Light mode';
        this.themeIcon = 'fa-solid fa-sun';
      }
      else {
        this.themeText = this.themeText = 'Dark mode';
        this.themeIcon = 'fa-solid fa-moon';
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
    this.isDarkModeSub.unsubscribe();
  }

}
