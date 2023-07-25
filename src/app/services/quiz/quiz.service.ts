import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface QuizzesModel{
  id: number;
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  apiLink = 'https://localhost:6001/api/quiz';

  quizzes$ = new BehaviorSubject<QuizzesModel[]>([]);

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<QuizzesModel[]>{
    return this.http.get<QuizzesModel[]>(this.apiLink)
      .pipe(
        tap(quizzes => this.quizzes$.next(quizzes))
      );
  }
}
