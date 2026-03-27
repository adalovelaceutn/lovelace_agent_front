import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  access_token: string;
  token_type?: string;
}

export interface RegisterPayload {
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  email: string;
  domicilio: string;
  telefono: string;
  user_name: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'https://lovelace-data-api.onrender.com';
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient) {}

  login(user_name: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, { user_name, password })
      .pipe(
        tap(response => {
          if (response?.access_token) {
            localStorage.setItem(this.TOKEN_KEY, response.access_token);
          }
        })
      );
  }

  register(payload: RegisterPayload): Observable<unknown> {
    return this.http.post(`${this.API_URL}/usuarios`, payload);
  }

  loginWithGoogle(): void {
    const callbackUrl = `${window.location.origin}/auth/callback`;
    window.location.href = `${this.API_URL}/auth/google?redirect_uri=${encodeURIComponent(callbackUrl)}`;
  }

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
