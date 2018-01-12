import { Component, OnInit, ViewEncapsulation, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { WindowSizeService } from '../services/window-size.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, AfterViewInit {
  divWidth: Number;
  chatForm: FormGroup;
  constructor(private windowSize: WindowSizeService, private fb: FormBuilder, public db: AngularFireDatabase) {
    this.windowSize.RegisterListener(x => this.divWidth = x);
    this.createForm();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {


  }
  createForm(): void {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.chatForm.patchValue({
      name: 'me'
    });
  }
  public onSubmit(): void {

  }
}
