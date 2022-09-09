import {Component, OnDestroy, OnInit} from '@angular/core';

import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.component.scss'],
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit{
  istAngemelden: boolean=false;
  userFirstname: string = " ";
  userLastname: string = " ";
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let localEmail = localStorage.key(0)|| "";
    let localPassword = localStorage.getItem(localEmail)||"";
    if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
      return;
    }

    this.userService.login(localEmail).subscribe(
      (user) =>{
        if (user.password.localeCompare(localPassword) ==0) {
          this.istAngemelden=true;
          this.userLastname=user.lastname;
          this.userFirstname=user.firstname;
        }
      },
      (error)=>{
        //this.router.navigate(["/auth/login"])
      }
    );
  }
}
