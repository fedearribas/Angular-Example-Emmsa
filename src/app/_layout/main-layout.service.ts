import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  private displaySidebarSubject = new BehaviorSubject<boolean>(false);
  displaySidebar$ = this.displaySidebarSubject.asObservable();

  private showMiniSidebarSubject = new BehaviorSubject<boolean>(true);
  showMiniSidebar$ = this.showMiniSidebarSubject.asObservable();

  private overlaySidebarSubject = new BehaviorSubject<boolean>(false);
  overlaySidebar$ = this.overlaySidebarSubject.asObservable();

  private isDarkThemeStoredSetting: boolean = JSON.parse(localStorage.getItem('dark-theme') ?? 'false');
  private isDarkThemeSubject = new BehaviorSubject<boolean>(this.isDarkThemeStoredSetting);
  isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  toggleSidebar() {
    this.displaySidebarSubject.next(!this.displaySidebarSubject.value);
  }

  closeSidebar() {
    if (this.displaySidebarSubject.value)
      this.displaySidebarSubject.next(false);
  }

  openSidebar() {
    if (!this.displaySidebarSubject.value)
      this.displaySidebarSubject.next(true);
  }

  toggleShowMiniSidebar() {
    this.showMiniSidebarSubject.next(!this.showMiniSidebarSubject.value);
  }

  toggleOverlaySidebar() {
    this.overlaySidebarSubject.next(!this.overlaySidebarSubject.value);
  }

  setShowMiniSidebar(value: boolean) {
    this.showMiniSidebarSubject.next(value);
  }

  setOverlaySidebar(value: boolean) {
    this.overlaySidebarSubject.next(value);
  }

  switchTheme() {
    let isDarkTheme = !this.isDarkThemeSubject.value;
    const themeChanged = this.setTheme(isDarkTheme);

    if (themeChanged) {
      this.isDarkThemeSubject.next(isDarkTheme);
      localStorage.setItem('dark-theme', JSON.stringify(isDarkTheme));
    }
  }

  setTheme(isDarkTheme: boolean) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    const lightThemeCss = 'light-theme';
    const darkThemeCss = 'dark-theme';

    if (themeLink) {
      if (isDarkTheme)
        themeLink.href = darkThemeCss + '.css';
      else
        themeLink.href = lightThemeCss + '.css';

      return true;
    }
    return false;
  }

}
