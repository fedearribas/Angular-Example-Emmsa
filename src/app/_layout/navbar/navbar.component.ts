import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { ThemeService } from 'src/app/theme.service';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  
  menuOpened = false;
  themeText$ = this.themeService.isDarkTheme$.pipe(
    map(isDark => isDark ? 'Dark mode' : 'Light mode')
  );
  themeIcon$ = this.themeService.isDarkTheme$.pipe(
    map(isDark => isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun')
  );

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
}
