import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { LocalDataService } from 'src/app/service/localData.service';
import { ProductService } from 'src/app/service/product.service';
import { SharedService } from 'src/app/service/shared.service';
import { ToasterService } from 'src/app/service/toastr.service';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favoriteList: number[]=[0];
  products: Product[]=[new Product];

  constructor(
    private localAuth: LocalDataService,
    private productsService: ProductService,
    private toastrService: ToasterService,
    private router: Router,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.favoriteList=this.localAuth.localFavorite();
    this.localAuth.isLocalAuthenticated();
    this.getProducts();
  }

  getProducts(){
    this.productsService.getAllProducts().subscribe(
      (products)=>{
        if(!products){
          this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
          return;
        }
        this.favoriteList.forEach((n)=>{
          products.forEach((pro)=>{
            if(n==pro.id)this.products.push(pro);
          })
        })
        if(this.products[0].name=="")this.products.splice(0, 1);//remove the first element from the list
      },
      (error)=>{
        this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
      }
    )
  }

  rundenaufzweistellen(x: number) {  //aufrunden 2 stellen nach komma
    var k = (Math.ceil(x * 100) / 100).toString();
    k += (k.indexOf('.') == -1)? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3).replace('.',',');
  }

  handleProduct(i: number){
    this.router.navigate(["products/"+i]);
  }

  AddToShoppingCart(i: number){
    let order= new Order();
    order.productId=this.products[i].id;
    order.name=this.products[i].name;
    order.price=this.products[i].price;
    order.image=this.products[i].link;
    order.quantity=1;
    this.sharedService.orders.next(order);
    this.onDelete(this.products[i].id);
    this.router.navigate(["/products/shopping"]);
  }

  onDelete(i: number){
    this.favoriteList.forEach((n, index)=>{
      if(n==i){
        this.favoriteList.splice(index, 1);
        this.products.splice(index, 1);
      }
    })
    
    this.sharedService.favoriteCounter.next(this.favoriteList.length)
    localStorage.setItem("Favorite List", this.favoriteList.toString());

  }

}
