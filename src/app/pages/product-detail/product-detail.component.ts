import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import {Router, ActivatedRoute} from "@angular/router";
import { ToasterService} from "../../service/toastr.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  id: number=0;
  product: Product = new Product();
  myThumbnail=this.product.link;
  myFullresImage=this.product.link;
  products: Product[]=[this.product];

  constructor(
    private productsService: ProductService,
    private toastrService: ToasterService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id=Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.getProduct();
  }

  getProducts(){
    this.productsService.getAllProductsByproductTyp(this.product.productTyp).subscribe(
      (products)=>{
        if(!products){
          this.toastrService.showMessage("Etwas ist schief geläufen. Versuchen Sie später.", "WARN");
          return;
        }
        this.products=products
        console.log(this.products)
      }
    )

  }

  getProduct(){
    this.productsService.getProduct(this.id).subscribe(
      (product) =>{
        this.product = product;
        this.getProducts();
      },
      (error)=>{
        this.toastrService.showMessage("Etwas ist schief geläufen. Versuchen Sie später.", "WARN");
        this.router.navigate(["/"])
      }
    )
  }
}
