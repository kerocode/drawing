import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

//const zoomFadeIn = {opacity: 0, transform: 'translateX({{ x }}) translateY({{ y }}) scale(0)'};
//const zoomFadeInFrom = { ...zoomFadeIn, transformOrigin: '{{ ox }} {{ oy }}' };
//const easeInFor: (duration: number) => string = (duration) => `${duration}ms cubic-bezier(0.35, 0, 0.25, 1)`;


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        query('.container', [style({ opacity: 0, transform: 'translateX(0px) translateY(0px) scale(0)', transformOrigin: '50% 50%' })]),
        group([
          animate('100ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1 })),
          query('.container', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))),
        ]),
      ]),
      transition(':leave', group([
        animate(300, style({ opacity: 0 })),
        query('.container', [
          animate(300, style({ opacity: 0, transform: 'translateX(0px) translateY(0px) scale(0)' }))
        ])
      ]))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ChatModalComponent implements OnInit {
  public data = {
    value: 'inactive',
    params: {
      x: null,
      y: null,
      ox: null,
      oy: null
    }
  };
  constructor() { }

  ngOnInit() {
  }
  private calculateZoomOrigin(event) {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const window = document.body.getBoundingClientRect();
    const wh = window.width / 2;
    const hh = window.height / 2;
    const x = clientX - wh;
    const y = clientY - hh;
    const ox = clientX / window.width;
    const oy = clientY / window.height;

    this.data.params.x = `${x}px`;
    this.data.params.y = `${y}px`;
    this.data.params.ox = `${ox * 100}%`;
    this.data.params.oy = `${oy * 100}%`;
  }
  private makeVisible() {
    this.data.value = 'active';
  }

  hide() {
    this.data.value = 'inactive';
  }

  toggle() {
    this.data.value === 'active' ? this.hide() : this.makeVisible();
  }
  show(event: any, group: any) {
    this.calculateZoomOrigin(event);
    this.makeVisible();
  }
}
