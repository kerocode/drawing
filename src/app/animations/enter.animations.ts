import { trigger, stagger, animate, style, group, query, transition, state } from '@angular/animations';

export const enterTransition = trigger('enterTransition', [
  state('inactive', style({ opacity: '0', position: 'fixed', bottom: '0', width: '100%', 'z-index': '-1' })),
  transition('inactive=>active', [
    style({ transform: 'translateX(100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)', opacity: '1' }))
  ]),
  transition('active=>inactive', [
    style({ transform: 'translateX(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(-200%)' })),
  ])
]);
