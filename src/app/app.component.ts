import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './app.animation';
import { MenuItem } from './menuItem';
import { MainLayoutService } from './_layout/main-layout.service';

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
  isDarkTheme!: boolean;
  expanded = false;
  items: Array<MenuItem> = [];

  constructor(private router: Router,
    private layoutService: MainLayoutService) { }

  ngOnInit(): void {

    this.items = [
      { text: 'Home', icon: 'k-i-home', path: '' },
      { text: 'Projects', icon: 'k-i-check', path: '/projects' },
      { text: 'Mika', icon: 'k-i-graph', path: '' },
    ];
    this.items[0].selected = true;

    this.routeSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/')
          this.showFooter = true;
        else
          this.showFooter = false;
      }
    })

    this.themeSub = this.layoutService.isDarkTheme$.subscribe(
      value =>  {
        this.layoutService.setTheme(value);
        this.isDarkTheme = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.themeSub.unsubscribe();
  }

}
