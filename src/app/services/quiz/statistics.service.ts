import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { QuizzesModel } from './quiz.service';

export interface StatisticsModel{  
  point: number,
  quizId: number,
  quizzes: QuizzesModel
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  apiLink = 'https://localhost:6001/api/statistics';

  statistics$ = new BehaviorSubject<StatisticsModel[]>([]);
  points$ = new BehaviorSubject<StatisticsModel>(null as any);

  constructor(private http: HttpClient) { }

  createSession(id: number): Observable<{}>{
    return this.http.post(`${this.apiLink}/id?id=${id}`, null);
  }

  getPoints(id: number): Observable<StatisticsModel>{
    return this.http.get<StatisticsModel>(`${this.apiLink}/id?id=${id}`)
      .pipe(
        tap(point => this.points$.next(point))
      );
  }

  getStatistics(): Observable<StatisticsModel[]>{
    return this.http.get<StatisticsModel[]>(this.apiLink)
      .pipe(
        tap(statistics => this.statistics$.next(statistics))
      );
  }

  clearStatistics(): Observable<{}>{
    return this.http.delete(this.apiLink)
      .pipe(
        tap(() => this.statistics$.next(null as any))
      );
  } 
}
