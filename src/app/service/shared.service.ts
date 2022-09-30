import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

    orders: BehaviorSubject<Order> = new BehaviorSubject(new Order());
    user: BehaviorSubject<User> = new BehaviorSubject(new User());
    senduser: BehaviorSubject<User> = new BehaviorSubject(new User());
    warenkorbCounter: BehaviorSubject<number> = new BehaviorSubject(0);
    favoriteCounter: BehaviorSubject<number> = new BehaviorSubject(0);
    category: BehaviorSubject<string> = new BehaviorSubject('');

    constructor() { }
}