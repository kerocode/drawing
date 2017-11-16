import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/subject';

@Injectable()
export class WindowSizeService implements OnDestroy {

  windowWidth = new Subject<Number>();
  constructor() {
    this.windowWidth.next(window.innerWidth);
  }
  public addSize(width: Number): void {
    this.windowWidth.next(width);
  }
  public RegisterListener(fn: (arg: any) => Number): void {
    this.windowWidth.subscribe(fn);
  }
  ngOnDestroy(): void {
    this.windowWidth.unsubscribe();
  }
}
