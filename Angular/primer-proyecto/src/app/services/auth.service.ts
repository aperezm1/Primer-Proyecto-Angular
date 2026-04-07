import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? 'Bearer ' + token : null;
  }
}