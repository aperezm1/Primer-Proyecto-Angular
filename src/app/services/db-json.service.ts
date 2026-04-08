import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class DbJsonService {
  private http = inject(HttpClient);
  private apiUrl = API_ENDPOINTS.usersLocal;

  login(email: string, pass: string) {
    return this.http.get<any[]>(this.apiUrl + '?email=' + email + '&pass=' + pass);
  }
}