import { Component, OnInit, ViewEncapsulation, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { WindowSizeService } from '../services/window-size.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
export interface Message {
  name: string;
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, AfterViewInit {
  divWidth: Number;
  chatForm: FormGroup;
  remote$: AngularFirestoreDocument<{}>;
  messages: Message[] = [];
  @Input() userName: string;
  constructor(private windowSize: WindowSizeService, private fb: FormBuilder, public db: AngularFirestore) {
    this.windowSize.RegisterListener(x => this.divWidth = x);
    this.remote$ = this.db.doc('chat-450');

    this.createForm();
    //[disabled]="chatForm.status === 'INVALID'"
  }

  ngOnInit() {
    this.remote$.valueChanges().subscribe(
      (data: any) => {
        if (data.name === this.userName) {
          data.name = 'me';
        }
        this.messages.push(data);
      });
  }
  ngAfterViewInit() {


  }
  createForm(): void {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
      name: ['', Validators.required],
    });
    /*this.chatForm.patchValue({
      name: 'me'
    });*/
  }
  public onSubmit(): void {
    console.log(this.chatForm.value);
    const m = {
      name: this.userName,
      message: this.chatForm.value['message']
    };
    this.remote$.update(m);
    this.chatForm.reset();
  }
}
