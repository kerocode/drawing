import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { WindowSizeService } from '../services/window-size.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JoinChatComponent implements OnInit {
  divWidth;
  joinForm: FormGroup;
  @Output() userName = new EventEmitter<string>();
  constructor(private windowSize: WindowSizeService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.windowSize.RegisterListener(x => this.divWidth = x * 0.5);
  }
  private createForm(): void {
    this.joinForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  public onSubmit() {
    this.userName.emit(this.joinForm.value.name);
  }
}
