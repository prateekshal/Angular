import { Component, Inject, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService, @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe((dish) => this.dish = dish,
    errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    errmess => this.promotionErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader().
    subscribe((leader) => this.leader = leader,
    errmess => this.leaderErrMess = errmess);
  }

}
