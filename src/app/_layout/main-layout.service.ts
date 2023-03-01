import { Injectable } from '@angular/core';
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
}
