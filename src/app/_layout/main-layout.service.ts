import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  private displaySidebar = new BehaviorSubject<boolean>(false);
  displaySidebar$ = this.displaySidebar.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  toggleSidebar() {
    this.displaySidebar.next(!this.displaySidebar.value);
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
        themeLink.href = theme + '.css';
    }
}

}
