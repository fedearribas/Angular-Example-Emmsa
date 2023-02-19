import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  private displaySidebar = new BehaviorSubject<boolean>(false);
  displaySidebar$ = this.displaySidebar.asObservable();

  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  toggleSidebar() {
    this.displaySidebar.next(!this.displaySidebar.value);
  }

  switchTheme() {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    const lightThemeCss = 'light-theme';
    const darkThemeCss = 'dark-theme';

    if (themeLink) {
      let isDarkTheme = !this.isDarkTheme.value;
      if (isDarkTheme)
        themeLink.href = darkThemeCss + '.css';
      else
        themeLink.href = lightThemeCss + '.css';

      this.isDarkTheme.next(isDarkTheme);
    }
  }

}
