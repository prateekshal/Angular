import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comments';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  rating: number;

  @ViewChild('ctform') commentFormDirective;
  @ViewChild('slider') slider;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author' : {
      'required': 'Name is required',
      'minlength': 'Name must contain at least 2 characters'
    },
    'comment': {
      'required': 'Comments are required'
    }
  }

  constructor(private dishService: DishService, private location: Location, 
    private route: ActivatedRoute, public fb: FormBuilder, @Inject('BaseURL') private baseURL) {
      this.createCommentForm();
     }

  ngOnInit() {
    //let id = this.route.snapshot.params['id'];
      // this.dishService.getDish(id)
    // .subscribe((dish) => this.dish = dish);
     
    this.dishService.getDishIds()
    .subscribe((ids) => this.dishIds = ids);
    this.route.params
    .pipe(switchMap((params: Params)=> this.dishService.getDish(params['id'])))
    .subscribe(dish =>{this.dish = dish; this.setPrevNext(dish.id)});
  }

  onValueChanged(data?){
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      rating: 1,
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: new Date()
    })

    this.commentForm.valueChanges
    .subscribe((data) => this.onValueChanged(data));

    this.onValueChanged();
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]
  }

  goBack():void{
    this.location.back();
  }

  onInputChange(event: MatSliderChange) {
    this.rating= event.value;
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.rating = this.rating;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dishService.addDish(this.dishIds.indexOf(this.dish.id), this.comment);
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: new Date()
    });
    this.slider.value = 5;
    this.commentFormDirective.resetForm();
  }

}
