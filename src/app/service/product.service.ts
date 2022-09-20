import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from '../model/product';

@Injectable({
    providedIn: 'root',
  })
  export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]>{
        return this.http.get<Product[]>('http://localhost:8090/shop/products/').pipe(
            map((e) => e ),
            catchError((error) => {
              return throwError(error.status);
            })
          );
    }

    getAllProductsByproductTyp(productTyp: String): Observable<Product[]>{
      return this.http.get<Product[]>('http://localhost:8090/shop/products/productTyp/'+productTyp).pipe(
          map((e) => e ),
          catchError((error) => {
            return throwError(error.status);
          })
        );
    }

    getProduct(productId: number): Observable<Product> {
      return this.http.get<Product>('http://localhost:8090/shop/products/id/'+productId).pipe(
        map((e) => e ),
        catchError((error) => {
          return throwError(error.status);
        })
      );
    }

  }