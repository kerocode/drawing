import {
  Component, OnInit, ElementRef, ViewEncapsulation, HostListener, Input, ViewChild,
  AfterViewInit, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { Observable,fromEvent } from 'rxjs';
import { map, filter, throttleTime, switchMap, takeUntil, pairwise, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase,AngularFireObject} from 'angularfire2/database';
import { WindowSizeService } from '../services/window-size.service';
import { AuthService } from './../services/auth.service';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';
@Component({
  selector: 'app-draw-it',
  templateUrl: './draw-it.component.html',
  styleUrls: ['./draw-it.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DrawItComponent implements OnInit, AfterViewInit, OnDestroy {

  private mouseDown$;
  private mouseUp$;
  private mouseMove$;
  private windowResize;
  childObject: string;
  private drawing = {};
  canvasEl: HTMLCanvasElement;
  public colors = ['#039be5', '#303f9f', '#c2185b', '#d32f2f', '#ffa000', '#f4511e', '#616161', '#9e9e9e', '#607d8b', '#ff1744',
    '#212121', '#d50000', '#4fc3f7', '#304ffe', '#4db6ac', '#00695c', '#827717', '#4caf50'];
  matadata: Observable<any>;
  private remoteRef$:AngularFireObject<any>
  private usersRef$: AngularFireObject<any>
  private remote$:Observable<any>
  private users$: Observable<any>
  private user : User; 
  @ViewChild('myCanvas') public myCanvas: ElementRef;
  // setting a width and height for the canvas
  @Input() public width = 600;
  @Input() public height = 800;

  private cx: CanvasRenderingContext2D;
  lineWidth = 3;
  constructor(private element: ElementRef, public db: AngularFireDatabase, private windowSize: WindowSizeService, 
    private  authService:AuthService) {
    this.remote$ = this.db.object('drawing').valueChanges();
    this.remote$.subscribe(
      (d: any) => {
        if (d) {
          this.drawOnCanvas(d.prevPos, d.currentPos);
        }
      }); 
    authService.authorizedUser.subscribe(
      usr=>{
        if(usr){
          this.user = usr ;
          let path = `users/${usr.uid}`;
          this.users$ =  this.db.object('users').valueChanges();  
        }     
       /* authService.authorizedUser().subscribe(
          (user)=>{
            this.user = user;
            let path = `users/${this.user.uid}`;
            this.remote$ = this.db.object(`drawing-dc4d1/${this.user.uid}`);
            this.remote$.subscribe(
              (d: any) => {
                if (d) {
                  this.drawOnCanvas(d.prevPos, d.currentPos);
                }
              });
            this.db.object(path).update({'isLoggedIn':true})
            .catch(error=> console.log(error));
          }
        ); */
      });

  }

  // angular life cycle hooks
  ngOnInit() {

  }
  public ngAfterViewInit() {

    this.canvasEl = this.myCanvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    // set the width and height
    this.canvasEl.width = window.innerWidth * 0.85;
    this.canvasEl.height = this.height;
    this.windowResize = fromEvent(window, 'resize').pipe(throttleTime(150));
    this.windowResize.subscribe((event) => {
      this.canvasEl.width = event.currentTarget.innerWidth * 0.85;
      this.windowSize.addSize(this.canvasEl.width);
    });
    // set some default properties about the line
    this.cx.lineWidth = this.lineWidth;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    // we'll implement this method to start capturing mouse events
    this.captureEvents(this.canvasEl);
  }
  ngOnDestroy(): void {

  }
  // end angular life cycle hooks
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
          x: res[0].clientX,
          y: res[0].clientY
        };

        const currentPos = {
          x: res[1].clientX,
          y: res[1].clientY
        };
        // Object.defineProperty(obj, this.childObject, { value: { prevPos: prevPos, currentPos: currentPos } });
        this.remoteRef$.update({prevPos:prevPos,currentPos:currentPos});
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.cx) { return; }
    const rect = this.canvasEl.getBoundingClientRect();
    const prevPosLoc = {
      x: prevPos.x - rect.left,
      y: prevPos.y - rect.top
    };

    const currentPosLoc = {
      x: currentPos.x - rect.left,
      y: currentPos.y - rect.top
    };
    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPosLoc.x, prevPosLoc.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPosLoc.x, currentPosLoc.y);
      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
  packColor(color: string) {
    /*this.matadata.set({ lineWidth: this.cx.lineWidth, strokeStyle: color });
    this.matadata.valueChanges().subscribe(
      (data: any) => {
        this.cx.strokeStyle = data.strokeStyle;
      });*/
    this.cx.strokeStyle = color;
  }
  onInputChange(event: any) {
    this.cx.lineWidth = event.value;
    /* this.matadata.set({ lineWidth: Number(event.value), strokeStyle: this.cx.strokeStyle });
     this.matadata.valueChanges().subscribe(
       (data: any) => {
         this.cx.lineWidth = data.lineWidth;
       });*/
  }
  private generateRandomName(): string {
    let name = 'child-';
    let i = 0;
    while (i < 2) {
      name += ((Math.random() * i) + i).toString().replace('.', '').substring(i);
      i++;
    }
    return name;
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
