import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { DropdownMenuItem } from 'src/app/shared/models/dropdown-menu-item';
import { ThemeService } from 'src/app/_layout/theme.service';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  
  themeText$ = this.themeService.isDarkTheme$.pipe(
    map(isDark => isDark ? 'Light mode' : 'Dark mode')
  );
  themeIcon$ = this.themeService.isDarkTheme$.pipe(
    map(isDark => isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon')
  );

  menuItems: DropdownMenuItem[] = [
    { text: this.themeText$, icon: this.themeIcon$, action: () => this.toggleTheme() }
  ]

  constructor(private layoutService: MainLayoutService,
    private themeService: ThemeService) { }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
