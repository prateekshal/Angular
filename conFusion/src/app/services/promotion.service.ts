import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(PROMOTIONS);
    //   },2000);
    // });
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    //   },2000);
    // });
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //   },2000);
    // });
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
