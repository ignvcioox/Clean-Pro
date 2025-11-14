import { HttpClient } from '@angular/common/http';
import { Injectable, inject, computed, signal } from '@angular/core';
import { Observable, of, map, catchError, throwError } from 'rxjs';

import { User } from '@auth/interfaces/user.interface';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { VerifyEmailResponse } from '@auth/interfaces/verify-email-response.interface';

import { environment } from '@environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseURL;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  /**
   * Inicia sesión de usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Observable que emite true si el inicio de sesión es exitoso.
   * @author Benjamín López
   */
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error)),
      );
  }

  /**
   * Registra un nuevo usuario.
   * @param fullName Nombre completo del usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @return Observable que emite true si el registro es exitoso.
   * @author Benjamín López
   */
  register(
    fullName: string,
    email: string,
    password: string,
  ): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        fullName: fullName,
        email: email,
        password: password,
      })
      .pipe(
        map(() => true),
        catchError((error: any) => this.handleAuthError(error)),
      );
  }

  verifyEmail(email: string, code: string): Observable<boolean> {
    return this.http
      .post<VerifyEmailResponse>(`${baseUrl}/auth/verify-email`, {
        email: email,
        code: code,
      })
      .pipe(
        map(() => true),
        catchError((error: any) => this.handleAuthError(error)),
      );
  }

  recoveryPassword(email: string): Observable<boolean> {
    return this.http.post<any>(`${baseUrl}/auth/recovery-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}/auth/reset-password`, {
      token,
      newPassword,
    });
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('checkStatus token:', token);
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {}).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error)),
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
    console.log('Logout ejecuted. Token', localStorage.getItem('token'));
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    console.log('handleAuthSuccess user:', user, 'token:', token);
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
    localStorage.setItem('token', token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return throwError(() => error);
  }
}
