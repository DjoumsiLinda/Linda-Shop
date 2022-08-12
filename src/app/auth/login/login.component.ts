import { Component, Inject, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { Title } from "@angular/platform-browser";
import { NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_STRATEGY} from "../../shared/constants/constants.ts";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  /*https://www.youtube.com/watch?v=7DzdebaSgxg
    https://www.youtube.com/watch?v=rBNOc4ymd1E
  https://www.youtube.com/watch?v=eMJ5spB3P1c */
  ngOnInit(): void {
  }
}
