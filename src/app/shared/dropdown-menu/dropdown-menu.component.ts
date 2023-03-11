import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { DropdownMenuItem } from '../models/dropdown-menu-item';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuComponent {

  @Input() items!: DropdownMenuItem[];

  menuOpened = false;

  @ViewChild('menuContent') menuContent!: ElementRef;
  @ViewChild('menuButton') menuButton!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      e.preventDefault();
      if (e.target && e.target !== this.menuContent.nativeElement && e.target !== this.menuButton.nativeElement)
        this.closeMenu();
    });
  }

  getValueAsObservable(value: any) {
    if (!isObservable(value))
      return of(value);
    return value;
  }

  toggleMenu() {
    if (!this.menuOpened)
      this.openMenu();
    else
      this.closeMenu();
  }

  private openMenu() {
    this.renderer.setStyle(this.menuContent.nativeElement, 'display', 'block');
    this.menuOpened = true;
  }

  private closeMenu() {
    this.renderer.setStyle(this.menuContent.nativeElement, 'display', 'none');
    this.menuOpened = false;
  }

}
