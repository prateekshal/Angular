import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service'
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(LEADERS);
    //   }, 2000);
    // })
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader>{
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve((LEADERS.filter((leader) => leader.featured)[0]));
    //   }, 2000)
    // });
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
