import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawItComponent } from './draw-it.component';

describe('DrawItComponent', () => {
  let component: DrawItComponent;
  let fixture: ComponentFixture<DrawItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawItComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test canvas', () => {
    const cx = component.canvasEl.getContext('2d');
    for (let index = 0; index < 100; index++) {
      cx.moveTo(index + 200, index + 100);
      cx.lineTo(index + 50, index + 75);
      cx.stroke();
    }

  });
});
