import { trigger, animate, transition, style, state } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  // route 'enter and leave (<=>)' transition
  transition('*<=>*', [
    // css styles at start of transition
    style({ opacity: 0 }),
    // animation and styles at end of transition
    animate('0.4s', style({ opacity: 1 }))
  ])
]);

export const sidebarTextAnimation = trigger('sidebarTextAnimation', [
  state('close', style({
    opacity: 0
  })),
  state('open', style({
    opacity: 1
  })),
  transition('close <=> open', animate(300)),
]);