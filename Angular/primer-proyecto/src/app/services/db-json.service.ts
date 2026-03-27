import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbJsonService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, pass: string) {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&pass=${pass}`);
  }
}