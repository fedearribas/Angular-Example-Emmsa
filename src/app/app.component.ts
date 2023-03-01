import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './app.animation';
import { MainLayoutService } from './_layout/main-layout.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { ThemeService } from './theme.service';

const expandedSidebarWidth = 250;
const miniSidebarWidth = 50;
const hiddenSidebarWidth = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'MikaNet';
  showFooter = false;
  overlaySidebar!: boolean;
  showMiniSidebar!: boolean;
  isSidebarExpanded$ = this.layoutService.displaySidebar$;
  routeSub!: Subscription;
  displaySidebarSub!: Subscription;
  breakpointObserverSub!: Subscription;
  showMiniSidebarSub!: Subscription;
  overlaySidebarSub!: Subscription;

  @ViewChild('sidebar') sidebarComponent!: SidebarComponent;
  @ViewChild('main') main!: ElementRef;

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private layoutService: MainLayoutService,
    private renderer: Renderer2,
    private themeService: ThemeService) { }

  openSidebar() {
    this.renderer.setStyle(this.sidebarComponent.sidebar.nativeElement, 'width', `${expandedSidebarWidth}px`);
    this.setOverlayValues(this.overlaySidebar);

    this.layoutService.openSidebar();
  }

  closeSidebar() {
    this.setMiniSidebarValues(this.showMiniSidebar);
    this.layoutService.closeSidebar();
  }

  toggleSidebar(value: boolean) {
    if (value)
      this.openSidebar();
    else
      this.closeSidebar();
  }

  setMiniSidebarValues(show: boolean) {
    if (show) {
      this.renderer.setStyle(this.sidebarComponent.sidebar.nativeElement, 'width', `${miniSidebarWidth}px`);
      this.renderer.setStyle(this.main.nativeElement, 'marginLeft', `${miniSidebarWidth}px`);
    }
    else {
      this.renderer.setStyle(this.sidebarComponent.sidebar.nativeElement, 'width', `${hiddenSidebarWidth}px`);
      this.renderer.setStyle(this.main.nativeElement, 'marginLeft', `${hiddenSidebarWidth}px`);
    }
  }

  setOverlayValues(overlay: boolean) {
    if (overlay)
      this.renderer.setStyle(this.main.nativeElement, 'marginLeft', `${hiddenSidebarWidth}px`);
    else
      this.renderer.setStyle(this.main.nativeElement, 'marginLeft', `${expandedSidebarWidth}px`);
  }

  ngOnInit(): void {

    this.themeService.apply();
    
    this.routeSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/')
          this.showFooter = true;
        else
          this.showFooter = false;
      }
    });
  }

  ngAfterViewInit(): void {

    this.showMiniSidebarSub = this.layoutService.showMiniSidebar$.subscribe(value => {
      this.showMiniSidebar = value;
      this.layoutService.closeSidebar();
      this.setMiniSidebarValues(this.showMiniSidebar);
    });

    this.overlaySidebarSub = this.layoutService.overlaySidebar$.subscribe(value => {
      this.overlaySidebar = value;
    });

    this.displaySidebarSub = this.layoutService.displaySidebar$.subscribe(value => this.toggleSidebar(value));

    this.breakpointObserverSub = this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe(() => {
        if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
          this.layoutService.setShowMiniSidebar(false);
          this.layoutService.setOverlaySidebar(true);
        }
        else {
          this.layoutService.setShowMiniSidebar(true);
          this.layoutService.setOverlaySidebar(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.breakpointObserverSub.unsubscribe();
    this.displaySidebarSub.unsubscribe();
    this.showMiniSidebarSub.unsubscribe();
    this.overlaySidebarSub.unsubscribe();
  }

}
