import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutService } from '../main-layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidenavComponent {
  
  displaySidebar$ = this.layoutService.displaySidebar$;

  constructor(private layoutService: MainLayoutService) { }

  onHide() {
    this.layoutService.toggleSidebar();
  }
}
