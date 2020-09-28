import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comments';
import { of, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]>{
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(DISHES);
    //   }, 2000);
    // });
    //return of(DISHES).pipe(delay(2000)).toPromise;
    //return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     let dish =  DISHES.filter((dish) => (dish.id === id))[0];
    //     resolve(dish);
    //   }, 2000)
    // });
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
  }

  getFeaturedDish(): Observable<Dish> {
    
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     let dish = DISHES.filter((dish) => dish.featured)[0];
    //     resolve(dish);
    //   }, 2000);
    // });
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map((dish) => dish.id)));
  }

  addDish(id: number, comment: Comment){
    //this.http.post
  }
}
