import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  private displaySidebar = new BehaviorSubject<boolean>(false);
  displaySidebar$ = this.displaySidebar.asObservable();

  constructor() { }

  toggleSidebar() {
    this.displaySidebar.next(!this.displaySidebar.value);
  }

}
