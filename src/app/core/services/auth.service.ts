import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getRawToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    const token = this.getRawToken();
    return token ? 'Bearer ' + token : null;
  }

  isLoggedIn(): boolean {
    return this.getRawToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}