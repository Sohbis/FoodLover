import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';


import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Dish } from '../shared/dish';

@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id));
  }
}

