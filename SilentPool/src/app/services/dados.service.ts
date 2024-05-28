import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = 'https://65f84d6bdf151452460f1162.mockapi.io/api/v1'

  getDados() {
    return this.httpClient.get<[]>(`${this.baseURL}/workspace`)
  }

  postDados(novaSala: any) {
    return this.httpClient.post<[]>(`${this.baseURL}/workspace`, novaSala)
  }
}

