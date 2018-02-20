import { trigger, stagger, animate, style, group, query, transition, state } from '@angular/animations';

export const enterTransition = trigger('enterTransition', [
  state('inactive', style({ opacity: '0', position: 'relative', bottom: '0', width: '100%','z-index': '-1' })),
  transition('inactive=>active', [
    style({ transform: 'translateX(100%)' }),
    animate(450, style({transform: 'scale3d(.3, .3, .3)  ', opacity: '0', offset: 0})), 
    animate(450, style({transform: 'none', opacity: '1', offset: 1}))
  ])
]);
