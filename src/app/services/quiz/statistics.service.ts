import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface StatisticsModel{
  id: number,
  name: string,
  point: number,
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  apiLink = 'https://localhost:6001/api/statistics';

  statistics$ = new BehaviorSubject<StatisticsModel[]>([]);

  constructor(private http: HttpClient) { }

  getPoints(): Observable<StatisticsModel[]>{
    return this.http.get<StatisticsModel[]>(this.apiLink)
      .pipe(
        tap(point => this.statistics$.next(point))
      );
  }

  clearStatistics(): Observable<{}>{
    return this.http.delete(this.apiLink);
  } 
}
