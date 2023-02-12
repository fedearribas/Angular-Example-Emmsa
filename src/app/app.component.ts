import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'angular-example';
  displaySidebar: boolean = false;
  @ViewChild('sidebar') sidebar: any;

  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }

}
