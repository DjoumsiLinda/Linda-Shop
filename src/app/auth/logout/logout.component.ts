import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";


@Component({
  selector: 'app-logout',
  template: '<p>Good Bye</p>'
})

export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    let localEmail = localStorage.key(0)|| "";
    let localPassword = localStorage.getItem(localEmail)||"";
    if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
      return;
    }
    localStorage.clear();
    this.router.navigate(["auth/login"])
  }
}
