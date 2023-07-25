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

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiLink = 'https://localhost:6001/api/question';

  questions$ = new BehaviorSubject<QuestionModel[]>([]);

  constructor(private http: HttpClient) { }

  getQuestions(id: number): Observable<QuestionModel[]>{
    return this.http.get<QuestionModel[]>(`${this.apiLink}/id?id=${id}`)
      .pipe(
        tap(ans => this.questions$.next(ans))
      );
  }
}
