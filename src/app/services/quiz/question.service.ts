import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CorrectsModel } from './correct.service';

export interface QuestionModel{
  id: number,
  number: number,
  question: string
  answers: string,
  correct: CorrectsModel
}

export interface QuestionWriteModel{
  id: number,
  number: number,
  question: string
  answers: string,
  quizId: number
  correct: CorrectsModel
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiLink = 'https://localhost:6001/api/question';

  questions$ = new BehaviorSubject<QuestionModel[]>([]);

  constructor(private http: HttpClient) { }

  getQuestions(id: number): Observable<QuestionModel[]>{
    return this.http.get<QuestionModel[]>(`${this.apiLink}/${id}`)
      .pipe(
        tap(ans => this.questions$.next(ans))
      );
  }

  addQuestion(model: QuestionModel): Observable<QuestionModel>{
    return this.http.post<QuestionModel>(this.apiLink, model)
      .pipe(
        tap(() => this.questions$.next([...this.questions$.value, model]))
      );
  }

  updateQuestion(model: QuestionModel, id: number): Observable<{}>{

    const updatedQuestion = this.questions$.value.map(b => b.id === id ? model : b);

    return this.http.put<{}>(`${this.apiLink}/${id}`, model)
      .pipe(
        tap(() => this.questions$.next(updatedQuestion))
      );
  }

  removeQuestion(id: number): Observable<{}> {
    const removeQuestion = this.questions$.value.filter(b => b.id !== id);

    return this.http.delete<{}>(`${this.apiLink}/${id}`)
      .pipe(
        tap(() => this.questions$.next(removeQuestion))
      );
  }
}
