import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ToasterService} from "../../service/toastr.service";
import { Order } from 'src/app/model/order';
import { SharedService } from 'src/app/service/shared.service';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { LocalDataService } from 'src/app/service/localData.service';

@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.component.html',
  styleUrls: ['./warenkorb.component.scss']
})

export class WarenkorbComponent implements OnInit {
  @Output() warenkorbUpdate = new EventEmitter<number>();

  products: Product[]=[new Product];
  order: Order[]=[];
  localEmail: string="";
  newOrder: Order=new Order();
  transport: number=0;
  warenkorbList: number[]=[0];

  constructor(
    private orderService: OrderService,
    private toastrService: ToasterService,
    private sharedService: SharedService,
    private router: Router,
    private localAuth: LocalDataService,
  ) { }

  ngOnInit(): void {
    this.localEmail = localStorage.getItem("User")?.split(":")[0]||"";
    this.sharedService.orders.subscribe((order) => {
       this.newOrder=order;
    });
    if(this.localEmail!=""){
      this.getProducts(this.newOrder);
    }
  }

  getProducts(newOrder:Order){
    if(this.localEmail==""){
      return;
    }
    this.orderService.getAllOrderByuserEmail(this.localEmail).subscribe(
      (orders)=>{
        if(!orders){
          this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
          return;
        }
        this.order=orders;
        this.transport=this.order.length*0.45;
        if(this.newOrder.name==""){
          return;
        }else{
          let isDa=false;
          this.order.forEach((order, index)=>{
            if(order.name==this.newOrder.name){
              order.quantity = order.quantity+this.newOrder.quantity; //changement de quantite
              isDa=true;
              this.orderService.updateOrder(this.order[index].id, this.order[index].quantity).subscribe(
                ()=>{
                  this.warenkorbUpdate.emit(this.getQuantity());
              })
            }
          })
          if(isDa==false){
            this.newOrder.userEmail=this.localEmail;
            this.order.push(this.newOrder); //ajoute un truc
            this.orderService.addOrder(this.newOrder).subscribe(
              ()=>{
                this.warenkorbUpdate.emit(this.getQuantity());
              }
            )
          }
        }
      }
    )
  }

  getQuantity(): number{
    var erg: number=0.0;
    this.order.forEach(or=>{
      erg=erg+or.quantity;
    })
    return erg;
  }
  getTotal(): number{
    var erg: number=0.0;
    this.order.forEach(or=>{
      erg=erg+(or.price*or.quantity);
    })
    return erg;
  }

  onHandleNumer(event: any, index: number) { 
    this.order[index].quantity= Number(event.target.value);
    console.log(this.order[index].quantity, this.order[index].id)
    this.orderService.updateOrder(this.order[index].id, this.order[index].quantity).subscribe(
      ()=>{
      console.log("suceffull");
    })
    this.warenkorbUpdate.emit(this.getQuantity());
  }

  rundenaufzweistellen(x: number) {  //aufrunden 2 stellen nach komma
    var k = (Math.ceil(x * 100) / 100).toString();
    k += (k.indexOf('.') == -1)? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3).replace('.',',');
  }

  productRemove(index: number){
    this.orderService.deleteOrder(this.order[index].id).subscribe(
      ()=>{
        this.warenkorbUpdate.emit(this.getQuantity());
    })
    if(index>=0 && index < this.order.length){
      this.order.splice(index, 1);
    }
    
  }

  OnPayHandle(){
    this.sharedService.senduser.subscribe((user) => {
      this.sharedService.user.next(user);
      this.router.navigate(["/products/order"]);
    });
  }

  onGotoProducts(){
    this.sharedService.senduser.subscribe((user) => {
      this.sharedService.user.next(user);
      this.router.navigate(["/products"]);
    });
  }

}
