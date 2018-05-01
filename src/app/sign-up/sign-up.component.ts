import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
hide:boolean = true ;
signupForm:FormGroup;
  constructor(private fb: FormBuilder, private auth:AuthService) { 
    this.createForm();
  }

  ngOnInit() {
  }
  private createForm():void{
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required],
    });
  }
  public onSubmit():void{
    this.auth.signUp(this.signupForm.value.email,this.signupForm.value.password).then(
      value=>{
        console.log('value from sign up',value);
      }
    );
    //console.log(this.signupForm.value);
  }
}
