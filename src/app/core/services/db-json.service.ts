import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { DbUser } from '../models/db-user';

@Injectable({
  providedIn: 'root'
})
export class DbJsonService {
  private http = inject(HttpClient);
  
  private apiUrl = API_ENDPOINTS.usersLocal;

  login(email: string, pass: string): Observable<DbUser[]> {
    return this.http.get<DbUser[]>(this.apiUrl + '?email=' + email + '&pass=' + pass);
  }
}