import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  isDarkTheme!: boolean;
  items!: MenuItem[];
  sub!: Subscription;

  constructor(private layoutService: MainLayoutService) { }

  ngOnInit() {

    this.sub = this.layoutService.isDarkTheme$.subscribe(
      value => { 
        this.isDarkTheme = value;
        
        this.items = [
          {
            label: this.isDarkTheme ? 'Light mode' : 'Dark mode',
            icon: this.isDarkTheme ? 'pi pi-fw pi-sun' : 'pi pi-fw pi-moon',
            command: (event) => {
              this.switchTheme();
            }
          }
        ];
      }
    );

  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  switchTheme() {
    this.layoutService.switchTheme();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
