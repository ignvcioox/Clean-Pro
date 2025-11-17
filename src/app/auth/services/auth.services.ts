import { HttpClient } from '@angular/common/http';
import { Injectable, inject, computed, signal } from '@angular/core';
import { Observable, of, map, catchError, throwError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { 
   User, 
   AuthResponse, 
   RegisterResponse,
   EmailVerificationResponse,
   PasswordRecoveryResponse,
   PasswordResetResponse,
} from '@auth/interfaces';

import { environment } from '@environments/environment';

type  AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl    = environment.baseURL;

/**
* Servicio de autenticación para Clean Pro.
* @description Gestiona toda la lógica de autenticación incluyendo login, registro, verificación de email, recuperación de contraseñas y manejo de estados de usuario.
* @features
* - Autenticación JWT con refresh automático.
* - Verificación de email por código
* - Recuperación y reset de contraseñas
* - Gestión de estados reactivos con signals
* - Persistencia de sesión en localStorage
* - Guards de autorización por roles
* @author Benjamín López
* @version 1.0.0
* @since 15-11-2025
*/
@Injectable({ providedIn: 'root' })
export class AuthService {

   private _authStatus = signal<AuthStatus>('checking');
   private _user       = signal<User | null>(null);
   private _token      = signal<string | null>(localStorage.getItem('token'));
   private http        = inject(HttpClient);

   checkStatusResource = rxResource({
      loader: () => this.checkStatus(),
   });

   authStatus = computed<AuthStatus>(() => {
      if (this._authStatus() === 'checking') return 'checking';
      if (this._user()) return 'authenticated';
      return 'not-authenticated';
   });

   user    = computed(() => this._user());
   token   = computed(() => this._token());
   isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

   /**
   * Autentica un usuario con su email y contraseña.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @return Observable<boolean> que emite true si el inicio de sesión es exitoso.
   * @author Benjamín López
   */
   login(email: string, password: string): Observable<boolean> {
      return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
         email,
         password
      }).pipe(
         map((resp) => this.handleAuthSuccess(resp)),
         catchError((error: any) => this.handleAuthError(error)),
      );
   };

   /**
   * Registra un nuevo usuario.
   * @param fullName Nombre completo del usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @return Observable<boolean> que emite true si el registro es exitoso.
   * @author Benjamín López
   */
   register(fullName: string, email: string, password: string): Observable<boolean> {
      return this.http.post<RegisterResponse>(`${baseUrl}/auth/register`, {
         fullName,
         email,
         password,
      }).pipe(
         map(() => true),
         catchError((error: any) => this.handleAuthError(error)),
      );
   };

   /**
   * Verifica el correo electrónico del usuario mediante un código de 6 dígitos.
   * @param email Correo electrónico del usuario.
   * @param code Código de verificación enviado al correo.
   * @return Observable<boolean> que emite true si la verificación es exitosa.
   * @author Benjamín López
   */
   verifyCodeEmail(email: string, code: string): Observable<boolean> {
      return this.http.post<EmailVerificationResponse>(`${baseUrl}/auth/verify-email`, {
         email,
         code,
      }).pipe(
         map(() => true),
         catchError((error: any) => this.handleAuthError(error)),
      );
   };

   /**
   * Inicia el proceso de recuperación de contraseña.
   * @param email Correo electrónico del usuario.
   * @return Observable<boolean> que emite true si la solicitud es exitosa.
   * @author Benjamín López 
   */
   recoveryPassword(email: string): Observable<boolean> {
      return this.http.post<PasswordRecoveryResponse>(`${baseUrl}/auth/recovery-password`, {
         email 
      }).pipe(
         map(() => true),  
         catchError((error: any) => this.handleAuthError(error)),
      );
   }

   /**
   * Restablece la contraseña usando un token de recuperación.
   * @param token Token de recuperación enviado por URL.
   * @param newPassword Nueva contraseña del usuario.
   * @return Observable<boolean> que emite true si el restablecimiento es exitoso.
   * @author Benjamín López
   */
   resetPassword(token: string, newPassword: string): Observable<boolean> {
      return this.http.post<PasswordResetResponse>(`${baseUrl}/auth/reset-password`, {
         token,
         newPassword,
      }).pipe(
         map(() => true),
         catchError((error: any) => this.handleAuthError(error)),
      );
   }

   /**
   * Verifica el estado de autenticación del usuario mediante el token almacenado.
   * @return Observable<boolean> que emite true si el token es válido
   * @author Benjamín López
   */
   checkStatus(): Observable<boolean> {
      const token = localStorage.getItem('token');
      
      if (!token) {
         this.logout();
         return of(false);
      }

      return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
         map((resp) => this.handleAuthSuccess(resp)),
         catchError((error: any) => this.handleAuthError(error)),
      );
   }

   /**
   * Cierra la sesión del usuario actual.
   * @author Benjamín López
   */
   logout() {
      this._user.set(null);
      this._token.set(null);
      this._authStatus.set('not-authenticated');
      localStorage.removeItem('token');
   }

   /**
   * Maneja respuestas exitosas de autenticación.
   * @param response - Respuesta del servidor con token y usuario
   * @return true - Indica éxito en la autenticación
   * @author Benjamín López
   */
   private handleAuthSuccess({ token, user }: AuthResponse) {
      this._user.set(user);
      this._token.set(token);
      this._authStatus.set('authenticated');
      localStorage.setItem('token', token);
      return true;
   }

   /**
   * Maneja errores de autenticación.
   * @param error - Objeto de error recibido
   * @return Observable que emite el error
   * @author Benjamín López
   */
   private handleAuthError(error: any) {
      this.logout();
      return throwError(() => error);
   }
}
