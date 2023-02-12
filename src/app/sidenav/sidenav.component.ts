import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent {

  @Input() displaySidebar!: boolean;
  @Output() closeSidebarEmitter = new EventEmitter();

  onHide() {
    this.closeSidebarEmitter.emit();
  }

}
