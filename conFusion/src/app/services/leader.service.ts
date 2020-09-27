import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(LEADERS);
    //   }, 2000);
    // })
    return of(LEADERS).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader>{
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve((LEADERS.filter((leader) => leader.featured)[0]));
    //   }, 2000)
    // });
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
