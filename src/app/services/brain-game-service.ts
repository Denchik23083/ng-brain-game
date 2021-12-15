import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface QuestionModel{
  question: string,
  answers: string,
}

export interface QuizzesModel{
  name: string,
  point: number,
}

@Injectable({
  providedIn: 'root'
})

export class BrainGameService {
  apiLink = 'https://localhost:6001/api';
  
  quest$ = new BehaviorSubject<QuestionModel[]>([]);
  quizzes$ = new BehaviorSubject<QuizzesModel[]>([]);

  constructor(private http: HttpClient) { }  

  getQuestionById(id: number): Observable<QuestionModel[]>{
    return this.http.get<QuestionModel[]>(`${this.apiLink}/Quiz/id?id=${id}`)
      .pipe(
        tap(ans => 
          {
            console.log(ans);
            // this.quest$.next(ans)
          })
      );
  }

  quizzes(model: QuizzesModel): Observable<QuizzesModel>{
    return this.http.post<QuizzesModel>(`${this.apiLink}/Quiz`, model)
    .pipe(
      tap(log => this.quizzes$.next([...this.quizzes$.value, log]))
    )
  }
}
