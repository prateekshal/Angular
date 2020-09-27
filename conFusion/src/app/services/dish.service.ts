import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return Promise.resolve(DISHES);
    //return DISHES;
  }

  getDish(id: string): Promise<Dish> {
    let dish =  DISHES.filter((dish) => (dish.id === id))[0];
    return Promise.resolve(dish);
  }

  getFeaturedDish(): Promise<Dish> {
    let dish = DISHES.filter((dish) => dish.featured)[0];
    return Promise.resolve(dish);
  }
}
