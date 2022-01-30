import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface QuestionModel{
  id: number
  question: string
  answers: string
}

export interface CorrectsModel{
  id: number,
  correctAnswer: string
}

export interface QuizzesModel{
  name: string,
  point: number,
}

export interface PointsModel{
  name: string,
  point: number,
}

@Injectable({
  providedIn: 'root'
})

export class BrainGameService {
  apiLink = 'https://localhost:6001/api';
  
  quest$ = new BehaviorSubject<QuestionModel | null>(null);
  corrects$ = new BehaviorSubject<CorrectsModel[]>([]);
  quizzes$ = new BehaviorSubject<QuizzesModel[]>([]);
  points$ = new BehaviorSubject<PointsModel | null>(null);

  constructor(private http: HttpClient) { }  

  getQuestionById(id: number): Observable<QuestionModel>{
    return this.http.get<QuestionModel>(`${this.apiLink}/Quiz/id?id=${id}`)
      .pipe(
        tap(ans => this.quest$.next(ans))
      );
  }

  corrects(model: CorrectsModel): Observable<CorrectsModel>{
    return this.http.post<CorrectsModel>(`${this.apiLink}/Corrects`, model)
    .pipe(
      tap(log => this.corrects$.next([...this.corrects$.value, log]))
    )
  }

  removePoints(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/Point`);
  }

  quizzes(model: QuizzesModel): Observable<QuizzesModel>{
    return this.http.post<QuizzesModel>(`${this.apiLink}/Quiz`, model)
    .pipe(
      tap(log => this.quizzes$.next([...this.quizzes$.value, log]))
    )
  }

  getPoints(): Observable<PointsModel>{
    return this.http.get<PointsModel>(`${this.apiLink}/Point`)
    .pipe(
      tap(pts => this.points$.next(pts))
    )
  }

  result(): Observable<{}>{
    return this.http.post<{}>(`${this.apiLink}/Point`, null);
  }
}
