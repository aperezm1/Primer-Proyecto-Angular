import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_ENDPOINTS.usersPublic;
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }
}