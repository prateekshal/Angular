import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comments';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMessageService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]>{
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(DISHES);
    //   }, 2000);
    // });
    //return of(DISHES).pipe(delay(2000)).toPromise;
    //return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     let dish =  DISHES.filter((dish) => (dish.id === id))[0];
    //     resolve(dish);
    //   }, 2000)
    // });
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     let dish = DISHES.filter((dish) => dish.featured)[0];
    //     resolve(dish);
    //   }, 2000);
    // });
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getDishIds(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map((dish) => dish.id)))
    .pipe(catchError(error => error));
  }

  addDish(id: number, comment: Comment){
    //this.http.post
  }
}
