import { Component, OnInit, ElementRef, ViewEncapsulation, HostListener, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { map, filter, throttleTime, switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-draw-it',
  templateUrl: './draw-it.component.html',
  styleUrls: ['./draw-it.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DrawItComponent implements OnInit, AfterViewInit {
  private mouseDown$;
  private mouseUp$;
  private mouseMove$;
  private windowResize;
  matadata: AngularFireObject<{}>;
  remote$: AngularFireObject<{}>;
  @ViewChild('canvas') public canvas: ElementRef;
  // setting a width and height for the canvas
  @Input() public width = 600;
  @Input() public height = 800;

  private cx: CanvasRenderingContext2D;
  lineWidth = 1.2;
  constructor(private element: ElementRef, public db: AngularFireDatabase) {
    this.matadata = this.db.object('mata-data');
    this.remote$ = this.db.object('drawing-dc4d1');
    this.remote$.valueChanges().subscribe(
      (data: any) => {
        this.drawOnCanvas(data.prevPos, data.currentPos);
      });
    this.matadata.valueChanges().subscribe(
      (data: any) => {
        this.cx.lineWidth = data.lineWidth;
        this.cx.strokeStyle = data.strokeStyle;
      });
  }
  ngOnInit() {

  }
  public ngAfterViewInit() {

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    // set the width and height
    canvasEl.width = window.innerWidth * 0.94;
    canvasEl.height = this.height;
    this.windowResize = fromEvent(window, 'resize').pipe(throttleTime(150));
    this.windowResize.subscribe((event) => {
      canvasEl.width = event.currentTarget.innerWidth * 0.94;
      console.log(event);
    });
    // set some default properties about the line
    this.cx.lineWidth = this.lineWidth;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {

    fromEvent(canvasEl, 'mousedown')
      .pipe(
      switchMap((e) => {
        return fromEvent(canvasEl, 'mousemove').pipe(
          // after a mouse down, we'll record all mouse moves
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a mouseUp event
          takeUntil(fromEvent(canvasEl, 'mouseup')),
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          pairwise()
        );
      }))
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
        this.remote$.set({ prevPos: prevPos, currentPos: currentPos });
        this.remote$.valueChanges().subscribe(
          (data: any) => {
            this.drawOnCanvas(data.prevPos, data.currentPos);
          });
        // this method we'll implement soon to do the actual drawing

      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
  packColor(color: string) {
    this.matadata.set({ lineWidth: this.cx.lineWidth, strokeStyle: color });
    this.matadata.valueChanges().subscribe(
      (data: any) => {
        this.cx.strokeStyle = data.strokeStyle;
      });
  }
  onInputChange(event: any) {
    this.matadata.set({ lineWidth: Number(event.value), strokeStyle: this.cx.strokeStyle });
    this.matadata.valueChanges().subscribe(
      (data: any) => {
        this.cx.lineWidth = data.lineWidth;
      });
  }
}
/*
constructor(private zone: NgZone) {
  this.zone.runOutsideAngular(() => {
    Observable.fromEvent(window, 'resize')
    .debounceTime(1500).distinctUntilChanged().subscribe((e: Event) => {
      this.zone.run(() => {
        this.changeSubject.next(e);
      })
    }
    )
  });
  this.changeSubject.subscribe((e: Event) => { this.doSmth(e); });
}
*/
