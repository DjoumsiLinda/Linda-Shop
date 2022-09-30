import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import {Router} from "@angular/router";
import { ToasterService} from "../../service/toastr.service";
import { LocalDataService } from 'src/app/service/localData.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  istFavorite: boolean[]=[false];
  favorite: number[]=[0];
  products: Product[]=[new Product];
  aktproducts: Product[]=[new Product];
  clickCount: number=0;
  
  constructor(
    private productsService: ProductService,
    private toastrService: ToasterService,
    private router: Router,
    private sharedService: SharedService,
    private localAuth: LocalDataService
  ) { }

  ngOnInit(): void {
    this.localAuth.isLocalAuthenticated();

    this.sharedService.category.subscribe((category)=>{
      if(category!=''){
        this.getProductsByCategory(category);
      }else{
        this.getProducts();
      }
    })

    this.favorite=this.localAuth.localFavorite();
    this.favorite.forEach((n)=>this.istFavorite[n]=!this.istFavorite[n])
  }
  
  getProducts(){
    this.productsService.getAllProducts().subscribe(
      (products)=>{
        if(!products){
          this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
          return;
        }
        this.products=products;
        if(this.products[0].name=="")this.products.splice(0, 1);//remove the first element from the list
        this.products.length <= 8 ? this.disabledButtonNextOn() : this.disabledButtonNextOff();
        this.aktproducts=this.products.slice(0,8);
      },
      (error)=>{
        this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
      }
    )
  }

  next(){
    this.clickCount++;
    this.disabledButtonPrevOff();
    this.aktproducts=this.products.slice(this.clickCount*8,(this.clickCount*8+8));
    if(this.products.length<=(this.clickCount*8+8) ){
      this.disabledButtonNextOn();
    }
  }

  prev(){
    if(this.clickCount>0){
      this.disabledButtonNextOff();
      this.aktproducts=this.products.slice(this.clickCount*8-8,this.clickCount*8);
      this.clickCount--;
      if(this.clickCount==0 ){
        this.disabledButtonPrevOn();
      }
    }
  }

  disabledButtonNextOn(){
    let myButtonNext = document.getElementById('myButtonNext');
    let myButtonNextDisabled = myButtonNext?.getAttribute("disabled");

    if (!myButtonNextDisabled) {
      myButtonNext?.setAttribute("disabled", "disabled");
    }
  }

  disabledButtonNextOff(){
    let myButtonNext = document.getElementById('myButtonNext');
    let myButtonNextDisabled = myButtonNext?.getAttribute("disabled");

    if (myButtonNextDisabled) {
          myButtonNext?.removeAttribute("disabled");
    }
  }

  disabledButtonPrevOn(){
    let myButtonPrev = document.getElementById('myButtonPrev');
    let myButtonPrevDisabled = myButtonPrev?.getAttribute("disabled");
    if (!myButtonPrevDisabled) {
      myButtonPrev?.setAttribute("disabled", "disabled");
    }
  }

  disabledButtonPrevOff(){
    let myButtonPrev = document.getElementById('myButtonPrev');
    let myButtonPrevDisabled = myButtonPrev?.getAttribute("disabled");
    if (myButtonPrevDisabled) {
      myButtonPrev?.removeAttribute("disabled");
    }
  }

  rundenaufzweistellen(x: number) {  //aufrunden 2 stellen nach komma
    var k = (Math.ceil(x * 100) / 100).toString();
    k += (k.indexOf('.') == -1)? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3).replace('.',',');
  }

  handleProduct(i: number){
    this.router.navigate(["products/"+i]);
  }

  getProductsByCategory(category: string){
    this.productsService.getAllProductsByproductTyp(category).subscribe(
      (products)=>{
        if(!products){
          this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
          return;
        }
        this.products=products;
        this.products.length <= 8 ? this.disabledButtonNextOn() : this.disabledButtonNextOff();
        this.aktproducts=this.products.slice(0,8);
      },
      (error)=>{
        this.toastrService.showMessage("Something went wrong. Please Try later.", "WARN");
      }
    )
  }
  onFavorite(i: number): void{
    let check=true;
    this.istFavorite[i]=!this.istFavorite[i];

    this.favorite.forEach((num, index)=>{
      if(num==i){
        this.favorite.splice(index, 1);
        check=false;
      }
    })
    if(check){
      this.favorite.push(i);
    }
    if(this.favorite[0]==0)this.favorite.splice(0, 1);//remove the first element from the list
    localStorage.setItem("Favorite List", this.favorite.toString());
    this.sharedService.favoriteCounter.next(this.favorite.length);
    //this.router.navigate(["products/favorite"]);
  }

}
