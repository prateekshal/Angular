import { Component, Inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), 
    expand()]
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errMsg: string;

  constructor(private dishService: DishService, @Inject('BaseURL') private baseURL) {
    
   }

  ngOnInit() {
    // this.dishService.getDishes()
    // .then((dishes) => this.dishes = dishes);
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes, 
    errmessage => this.errMsg = <any>errmessage);
  }

}
