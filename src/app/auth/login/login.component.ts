import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private  formBuilder: FormBuilder) {

  }

  ngOnInit(): void {}

  login(){

  }


  /*https://www.youtube.com/watch?v=7DzdebaSgxg
    https://www.youtube.com/watch?v=rBNOc4ymd1E
  https://www.youtube.com/watch?v=eMJ5spB3P1c */
}
