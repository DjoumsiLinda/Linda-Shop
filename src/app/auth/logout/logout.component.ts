import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { LocalDataService } from "src/app/service/localData.service";


@Component({
  selector: 'app-logout',
  template: '<h1 style="text-align: center; margin-top: 100px">Good Bye!</h1>'
})

export class LogoutComponent implements OnInit, OnDestroy {

  favoriteList: number[]=[0];

  constructor(
    private router: Router,
    private localAuth: LocalDataService,
  ) {}

  ngOnInit(): void {
    this.favoriteList=this.localAuth.localFavorite();
    let localEmail = localStorage.getItem("User")?.split(":")[0]|| "";
    let localPassword = localStorage.getItem("User")?.split(":")[1]|| "";
    if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
      return;
    }
    this.router.navigate(["auth/login"])
  }

  ngOnDestroy() {
    localStorage.clear();
    localStorage.setItem("Favorite List", this.favoriteList.toString());
  }
}
