import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface QuestionModel{
  id?: number,
  question: string,
}

@Injectable({
  providedIn: 'root'
})
export class BrainGameService {
  apiLink = 'https://localhost:6001/api';
  
  quest$ = new BehaviorSubject<QuestionModel[]>([]);

  constructor(private http: HttpClient) { }  

  getQuestionById(id: number): Observable<QuestionModel[]>{
    debugger;
    const getById = this.quest$.value.filter(b => b.id == id)
    
    return this.http.get<QuestionModel[]>(`${this.apiLink}/Quiz/id?id=${id}`)
      .pipe(
        tap(() => this.quest$.next(getById))
      );
  }
}
