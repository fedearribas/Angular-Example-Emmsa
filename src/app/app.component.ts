import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './app.animation';
import { MainLayoutService } from './_layout/main-layout.service';
import { BreakpointObserver } from '@angular/cdk/layout';

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

  sidebar!: HTMLElement;
  main!: HTMLElement;


  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private layoutService: MainLayoutService) { }

  openSidebar() {
    this.sidebar.style.width = "250px";
    this.main.style.marginLeft = "250px";
  }

  closeSidebar() {
    this.sidebar.style.width = "50px";
    this.main.style.marginLeft = "50px";
  }

  toggleSidebar(value: boolean) {
    if (value)
      this.openSidebar();
    else
      this.closeSidebar();
  }

  ngOnInit(): void {

    this.sidebar = document.getElementById("mySidebar")!;
    this.main = document.getElementById("main")!;

    this.layoutService.displaySidebar$.subscribe(value => this.toggleSidebar(value));

    

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
          this.sidebar.style.width = "0";
          this.main.style.marginLeft = "0";
        }
        else {
          
        }
      });

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.themeSub.unsubscribe();
    this.breakpointObserverSub.unsubscribe();
  }

}
