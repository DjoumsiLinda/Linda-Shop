import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import {Router, ActivatedRoute} from "@angular/router";
import { ToasterService} from "../../service/toastr.service";
import { Order } from 'src/app/model/order';
import { SharedService } from 'src/app/service/shared.service';
import { LocalDataService } from 'src/app/service/localData.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  favoriteList: number[]=[0];
  id: number=0;
  product: Product = new Product();
  myThumbnail=this.product.link;
  myFullresImage=this.product.link;
  products: Product[]=[this.product];
  quantity: number=1;
  

  constructor(
    private productsService: ProductService,
    private toastrService: ToasterService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sharedService: SharedService,
    private localAuth: LocalDataService,
  ) { }

  ngOnInit() {
    this.localAuth.isLocalAuthenticated();
    this.id=Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.getProduct();
    this.favoriteList=this.localAuth.localFavorite();
  }

  getProduct(){
    this.productsService.getProduct(this.id).subscribe(
      (product) =>{
        this.product = product;
        this.getProducts();
      },
      (error)=>{
        this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
        this.router.navigate(["/"])
      }
    )
  }
  getProducts(){
    this.productsService.getAllProductsByproductTyp(this.product.productTyp).subscribe(
      (products)=>{
        if(!products){
          this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
          return;
        }
        this.products=products
      }
    )

  }
  addQuantity(){
    this.quantity++;
  }
  addWarenkorb(){
    let order= new Order();
    order.productId=this.product.id;
    order.name=this.product.name;
    order.price=this.product.price;
    order.image=this.product.link;
    order.quantity=this.quantity;
    this.sharedService.orders.next(order);
    this.router.navigate(["/products/shopping"]);
  }

  rundenaufzweistellen(x: number) {  //aufrunden 2 stellen nach komma
    var k = (Math.ceil(x * 100) / 100).toString();
    k += (k.indexOf('.') == -1)? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3).replace('.',',');
  }

  addToFavorite(){
    let check=true;
    let id=this.product.id;
    this.favoriteList.forEach((num, index)=>{
      if(num==id){
        this.favoriteList.splice(index, 1);
        check=false;
      }
    })
    if(check){
      this.favoriteList.push(id);
    }
    this.sharedService.favoriteCounter.next(this.favoriteList.length)
    localStorage.setItem("Favorite List", this.favoriteList.toString());
    //this.router.navigate(["products/favorite"]);

  }
}
