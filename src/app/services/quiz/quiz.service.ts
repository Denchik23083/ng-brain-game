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

  addQuiz(model: QuizzesModel): Observable<QuizzesModel> {
    return this.http.post<QuizzesModel>(this.apiLink, model)
      .pipe(
        tap(() => this.quizzes$.next([...this.quizzes$.value, model]))
      );
  }

  updateQuiz(model: QuizzesModel, id: number): Observable<{}> {
    const updatedQuiz = this.quizzes$.value.map(b => b.id === id ? model : b);

    return this.http.put<{}>(`${this.apiLink}/id?id=${id}`, model)
      .pipe(
        tap(() => this.quizzes$.next(updatedQuiz))
      );
  }

  removeQuiz(id: number): Observable<{}> {
    const removeQuiz = this.quizzes$.value.filter(b => b.id !== id);

    return this.http.delete<{}>(`${this.apiLink}/id?id=${id}`)
      .pipe(
        tap(() => this.quizzes$.next(removeQuiz))
      );
  }
}
