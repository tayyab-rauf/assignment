import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetSalesService {
  private apiUrl = 'https://melivecode.com/api/pets';

  constructor(private http: HttpClient) {}

  getWeeklySales(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/7days/${date}`);
  }

  getDailySales(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${date}`);
  }
}