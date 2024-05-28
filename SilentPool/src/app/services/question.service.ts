import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = 'https://65f84d6bdf151452460f1162.mockapi.io/api/v1'

  getQuestions() {

    return this.httpClient.get<[]>(`${this.baseURL}/questions`);
  }

  postQuestion(novaPergunta: any) {
    return this.httpClient.post(`${this.baseURL}/questions`, novaPergunta);
  }

  updateQuestion(perguntaAtualizada: any): Observable<any> {
    const url = `${this.baseURL}/questions/${perguntaAtualizada.id}`;
    return this.httpClient.put(url, perguntaAtualizada);
  }
  // postQuestions(){}

  // deleteQuestions(){}  

}
