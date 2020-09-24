import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishService: DishService, private router: Router) {
    
   }

  ngOnInit() {
    this.dishes = this.dishService.getDishes();
  }

}
