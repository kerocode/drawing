import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  hide :boolean = true;
  errorFlag = false;
  
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth:AuthService) {
    this.createForm();
   }

  ngOnInit() {
  }
  private createForm():void{
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password:['', Validators.required],
    });
  }
  onSubmit():void{
    this.auth.logIn(this.loginForm.value.email,this.loginForm.value.password)
    .catch((err)=> {
      this.errorFlag = true;
      console.error(err);
    });
  }
}
