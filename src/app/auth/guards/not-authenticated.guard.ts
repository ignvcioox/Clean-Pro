import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '@auth/services/auth.services';

/**
* Guard de protección para rutas públicas (solo usuarios no autenticados).
* @description Protege rutas que deben ser accesibles únicamente para usuarios 
* no autenticados, como login, registro y recuperación de contraseña.
* Si el usuario ya está autenticado, lo redirige a la página principal.
* @author Benjamín López
* @version 1.0.0
* @since 15/11/2025
*/
export const NotAuthenticatedGuard: CanMatchFn = async () => {

   const authService = inject(AuthService);
   const router      = inject(Router);

   const isAuthenticated = await firstValueFrom(authService.checkStatus());

   if (isAuthenticated) {
      router.navigateByUrl('/');
      return false;
   }

   return true;
};
