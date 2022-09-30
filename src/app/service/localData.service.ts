import { Injectable } from "@angular/core";
import { SharedService } from "./shared.service";
import { UserService } from "./user.service";


@Injectable({
    providedIn: 'root',
})
export class LocalDataService {
    
    constructor(
        private userService: UserService,
        private sharedService: SharedService,
    ) {}
    
    public isLocalAuthenticated(): void{
        let localEmail = localStorage.getItem("User")?.split(":")[0]|| "";
        let localPassword = localStorage.getItem("User")?.split(":")[1] || "";
        if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
            return;
        }else{
            this.userService.login(localEmail).subscribe(
            (user) =>{
            if (user.password.localeCompare(localPassword) ==0) {
                this.sharedService.user.next(user);
            }
            }
        );
        }
    }

    public localFavorite():  number[]{
        let localFavoriteList = localStorage.getItem("Favorite List")||"";
        let favorite: number[]=[0];
        
        localFavoriteList.split(",").forEach((n)=>{
            if(Number(n)!=0)favorite.push(Number(n));
        });
        if(favorite[0]==0)favorite.splice(0, 1);//remove the first element from the list
        return favorite;
    }

}