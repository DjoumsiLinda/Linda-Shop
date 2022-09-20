import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import {Router} from "@angular/router";
import { ToasterService} from "../../service/toastr.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[]=[new Product];
  aktproducts: Product[]=[new Product];
  clickCount: number=0;
  
  constructor(
    private productsService: ProductService,
    private toastrService: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getAllProducts().subscribe(
      (products)=>{
        if(!products){
          this.toastrService.showMessage("Etwas ist schief geläufen. Versuchen Sie später.", "WARN");
          return;
        }
        this.products=products;
        this.products.push(...products);
        this.products.length <= 6 ? this.disabledButtonNextOn() : this.disabledButtonNextOff();
        this.aktproducts=this.products.slice(0,6);
      },
      (error)=>{
        this.toastrService.showMessage("Etwas ist schief geläufen. Versuchen Sie später."+error, "WARN");
        this.router.navigate(["/auth/login"])
      }
    )
  }

  next(){
    this.clickCount++;
    this.disabledButtonPrevOff();
    this.aktproducts=this.products.slice(this.clickCount*6,(this.clickCount*6+6));
    if(this.products.length<(this.clickCount+2*6+6) ){
      this.disabledButtonNextOn();
    }
  }

  prev(){
    if(this.clickCount>0){
      this.disabledButtonNextOff();
      this.aktproducts=this.products.slice(this.clickCount*6-6,this.clickCount*6);
      this.clickCount--;
      if(this.clickCount==0 ){
        console.log(this.clickCount)
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

}
