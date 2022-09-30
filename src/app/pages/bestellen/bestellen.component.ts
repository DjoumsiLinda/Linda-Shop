import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Adresse } from 'src/app/model/adresse';
import { Order } from 'src/app/model/order';
import { User } from 'src/app/model/user';
import { LocalDataService } from 'src/app/service/localData.service';
import { OrderService } from 'src/app/service/order.service';
import { SharedService } from 'src/app/service/shared.service';
import { ToasterService } from 'src/app/service/toastr.service';

@Component({
  selector: 'app-bestellen',
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.scss']
})
export class BestellenComponent implements OnInit {

  @Output() warenkorbUpdate = new EventEmitter<number>();
  
  user: User = new User();
  orders: Order[]=[new Order()];
  lieferadresse: Adresse=new Adresse();
  transport: number=0;
  total: number=0;

  constructor(
    private orderService: OrderService,
    private sharedService: SharedService,
    private localAuth: LocalDataService,
    private toastrService: ToasterService,
  ) { }

  ngOnInit(): void {
    this.localAuth.isLocalAuthenticated();
    this.sharedService.user.subscribe((user)=>this.user=user);
    let localEmail = localStorage.getItem("User")?.split(":")[0]|| "";

    if(localEmail!=""){
      this.orderService.getAllOrderByuserEmail(localEmail).subscribe(
        (orders)=>{
          if(!orders){
            this.toastrService.showMessage("Something went wrong. Try later.", "WARN");
            return;
          }
          this.orders=orders;
          this.total=this.getTotal();
          this.transport=this.orders.length*0.45;
          this.sharedService.user.subscribe((user)=> this.lieferadresse=user.lieferAdresse)
        }
      )
    }
  }

  rundenaufzweistellen(x: number) {  //aufrunden 2 stellen nach komma
    var k = (Math.ceil(x * 100) / 100).toString();
    k += (k.indexOf('.') == -1)? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3).replace('.',',');
  }

  getTotal(): number{
    var erg: number=0.0;
    this.orders.forEach(or=>{
      erg=erg+(or.price*or.quantity);
    })
    return erg;
  }

  OnPay(){
    this.toastrService.showMessage("Thank you for your command.", "SUCCESS");
    this.lieferadresse =new Adresse();
    this.transport=0;
    this.total=0;
    //effacer de la db
    this.orders.forEach(
      order=>{
        console.log(order)
        this.orderService.deleteOrder(order.id).subscribe(()=> console.log(order.id, "sucefull delete"))
      }
    )
    this.orders=[new Order()];

    //dire au parent que le warenkorb est null;
    this.warenkorbUpdate.emit(0);
  }
}

