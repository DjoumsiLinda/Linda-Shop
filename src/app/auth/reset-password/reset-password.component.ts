import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  state=1;
  resetState1Form=this.formBuilder.group({
    email:['', Validators.required]
  });
  resetState2Form=this.formBuilder.group({
    code:['', Validators.required],
    password:['', [Validators.required, Validators.minLength(5)]]
  })
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  resetState1Submit(){

  }
  resetState2Submit(){

  }
}
