import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MikaNet';
  showFooter = false;
  sub!: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/')
          this.showFooter = true;
        else
          this.showFooter = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
