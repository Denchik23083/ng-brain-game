import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CorrectsModel{
  questionId?: number,
  correctAnswer: string
}

@Injectable({
  providedIn: 'root'
})
export class CorrectService {

  apiLink = 'https://localhost:6001/api/correct';

  constructor(private http: HttpClient) { }

  corrects(model: CorrectsModel, id: number): Observable<CorrectsModel>{
    return this.http.post<CorrectsModel>(`${this.apiLink}/${id}`, model);
  }
}
