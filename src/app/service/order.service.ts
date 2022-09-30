import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Order } from '../model/order';

@Injectable({
    providedIn: 'root',
})

export class OrderService {

    constructor(private http: HttpClient) { }

    getAllOrderByuserEmail(email: string): Observable<Order[]>{
        return this.http.get<Order[]>('http://localhost:8100/shop/order/email/'+email).pipe(
            map((e) => e ),
            catchError((error) => {
              return throwError(error.status);
            })
          );
    }
    addOrder(order: Order):Observable<void>{
        return this.http.post<void>('http://localhost:8100/shop/order/add/', order).pipe(
            map((e) => e ),
            catchError((error) => {
              return throwError(error.status);
            })
          );
    }
    updateOrder(id: number, quantity: number):Observable<void>{
        return this.http.get<void>('http://localhost:8100/shop/order/update/id/' + id + '/quantity/' +quantity).pipe(
            map((e) => e ),
            catchError((error) => {
              return throwError(error.status);
            })
          );
    }

    deleteOrder(id: number):Observable<void>{
      return this.http.delete<void>('http://localhost:8100/shop/order/delete/id/' + id).pipe(
          map((e) => e ),
          catchError((error) => {
            return throwError(error.status);
          })
        );
  }

}