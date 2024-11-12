import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:8081';
  private readonly TOKEN_KEY = 'pet-clinic-user';

  constructor(private http: HttpClient) { }

  // Method for logging in
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  // Method for logging out
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
