import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './app.animation';
import { MenuItem } from './menuItem';
import { MainLayoutService } from './_layout/main-layout.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DrawerMode } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MikaNet';
  showFooter = false;
  routeSub!: Subscription;
  themeSub!: Subscription;
  breakpointObserverSub!: Subscription;
  isDarkTheme!: boolean;
  expanded = false;
  menuItems: Array<MenuItem> = [];
  menuMini = true;
  menuMode = <DrawerMode>'push';

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private layoutService: MainLayoutService) { }

  ngOnInit(): void {

    this.menuItems = [
      { text: 'Home', icon: 'k-i-home', path: '' },
      { text: 'Projects', icon: 'k-i-check', path: '/projects' },
      { text: 'Mika', icon: 'k-i-graph', path: '' },
    ];
    this.menuItems[0].selected = true;

    this.routeSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/')
          this.showFooter = true;
        else
          this.showFooter = false;
      }
    })

    this.themeSub = this.layoutService.isDarkTheme$.subscribe(
      value => {
        this.layoutService.setTheme(value);
        this.isDarkTheme = value;
      }
    );

    this.breakpointObserverSub = this.breakpointObserver.observe(['(max-width: 768px)'])
    .subscribe(() => {
      if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
        this.menuMini = false;
        this.menuMode = <DrawerMode>'overlay';
      }
      else {
        this.menuMini = true;
        this.menuMode = <DrawerMode>'push';
      }
    });

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.themeSub.unsubscribe();
    this.breakpointObserverSub.unsubscribe();
  }

}
