import {Component, OnInit} from '@angular/core';

import { SharedService } from '../service/shared.service';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { LocalDataService } from '../service/localData.service';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.component.scss'],
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit{
  favoriteList: number[]=[0];
  istAngemelden: boolean=false;
  userFirstname: string = "";
  userLastname: string = "";
  warenkorbCounter: number = 0;
  favoritCounter: number = 0;
  searchText: any;


  constructor(
    private orderService: OrderService,
    private sharedService: SharedService,
    private router: Router,
    private localAuth: LocalDataService
  ) {}

  ngOnInit(): void {
    this.sharedService.user.subscribe((user) => {
      if(user.firstname==''){
        return;
      }
      this.istAngemelden=true;
      this.userLastname=user.lastname;
      this.userFirstname=user.firstname;
      this.orderService.getAllOrderByuserEmail(user.email).subscribe(
        (orders)=>{
          this.warenkorbCounter=this.getQuantity(orders);
      }
      )
    });
    this.favoriteList=this.localAuth.localFavorite();
    this.sharedService.favoriteCounter.subscribe((n)=>{
      if(n!=0)this.favoritCounter=n;
      else this.favoritCounter=this.favoriteList.length;
    })
    
  }

  addWarenkorb(componentReference: any){
    if(!componentReference.warenkorbUpdate){
      return;
    }
    componentReference.warenkorbUpdate.subscribe((data: any) => {
      this.warenkorbCounter=data;
    })
  }

  getQuantity(order: Order[]): number{
    var erg: number=0.0;
    order.forEach(or=>{
      erg=erg+or.quantity;
    })
    return erg;
  }

  OnCategories(category: string){
    this.sharedService.category.next(category);
    this.router.navigate(["/products"])
  }

  /*
  https://fontawesomeicons.com/svg/icons/menu_hamburger
  https://freefrontend.com/css-menu/

  */
}
