import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SharedService } from './shared.service';

@Injectable()
export class AuthService {
    
  constructor(
      private userService: UserService,
      private sharedService: SharedService,
  ) {}
  
  public isAuthenticated(): boolean|void {    
    let localEmail = localStorage.getItem("User")?.split(":")[0]|| "";
    let localPassword = localStorage.getItem("User")?.split(":")[1] || "";
    if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
          return false;
      }else{
        return this.authLoginService(localEmail, localPassword );
     }
    
  }

  private authLoginService(localEmail: string, localPassword: string): boolean | void{
    this.userService.login(localEmail).subscribe(
      (user) =>{
        if (user.password.localeCompare(localPassword)==0) {
          this.sharedService.user.next(user);
          this.sharedService.senduser.next(user);
          console.log("AuthService: match ", user)
          return true;
        }
          return false;
      }
    );
  }

}