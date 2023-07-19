import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface QuestionModel{
  id: number,
  number: number,
  question: string
  answers: string
}

export interface CorrectsModel{
  questionId?: number,
  correctAnswer: string
}

export interface QuizzesModel{
  id: number;
  name: string,
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

  quizzes$ = new BehaviorSubject<QuizzesModel[]>([]);
  questions$ = new BehaviorSubject<QuestionModel[]>([]);
  points$ = new BehaviorSubject<PointsModel | null>(null);

  constructor(private http: HttpClient) { }  

  getQuizzes(): Observable<QuizzesModel[]>{
    return this.http.get<QuizzesModel[]>(`${this.apiLink}/quiz`)
      .pipe(
        tap(quizzes => this.quizzes$.next(quizzes))
      );
  }

  getQuestions(id: number): Observable<QuestionModel[]>{
    return this.http.get<QuestionModel[]>(`${this.apiLink}/question/id?id=${id}`)
      .pipe(
        tap(ans => this.questions$.next(ans))
      );
  }

  corrects(model: CorrectsModel): Observable<CorrectsModel>{
    return this.http.post<CorrectsModel>(`${this.apiLink}/correct`, model);
  }

  removePoints(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/Point`);
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
