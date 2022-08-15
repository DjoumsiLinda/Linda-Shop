import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.maxLength(50)]],
    lastname: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })
  constructor(private  formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  register(){

  }

}
