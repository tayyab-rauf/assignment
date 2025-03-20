import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attraction } from '../models/attraction.model';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  private readonly API_URL = 'https://melivecode.com/api/attractions';
  private readonly AUTH_API_URL = 'https://melivecode.com/api/auth/attractions';

  constructor(private http: HttpClient) {}

  getAttractions(page: number = 1, limit: number = 10): Observable<Attraction[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    return this.http.get<Attraction[]>(this.API_URL, { params });
  }

  getAttractionById(id: number): Observable<Attraction> {
    return this.http.get<Attraction>(`${this.API_URL}/${id}`);
  }

  createAttraction(attraction: Omit<Attraction, 'id'>): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.AUTH_API_URL}/create`, attraction);
  }

  updateAttraction(attraction: Attraction): Observable<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(`${this.AUTH_API_URL}/update`, attraction);
  }

  deleteAttraction(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.API_URL}/delete`, {
      body: { id }
    });
  }
}