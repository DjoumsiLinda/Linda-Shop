import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Observable, throwError} from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/shop/register', user).pipe(
      map((e) => e ),
      catchError((error) => {
        return throwError(error.status);
      })
    );
  }

  login(email: string): Observable<User>{
    return this.http.get<User>('http://localhost:8080/shop/login/'+email).pipe(
      map((e) => e ),
      catchError((error) => {
        return throwError(error.status);
      })
    );
  }
}
