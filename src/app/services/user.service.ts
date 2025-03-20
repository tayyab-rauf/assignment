import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://melivecode.com/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, limit: number = 10, search: string = ''): Observable<User[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }
    
    return this.http.get<User[]>(this.API_URL, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.API_URL}/create`, user);
  }

  updateUser(user: User): Observable<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(`${this.API_URL}/update`, user);
  }

  deleteUser(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.API_URL}/delete`, {
      body: { id }
    });
  }
}
