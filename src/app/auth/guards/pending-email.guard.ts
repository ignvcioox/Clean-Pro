import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
* Guard de protección para la página de verificación de email.
* @description Protege la ruta '/auth/check-email' asegurando que solo sea
accesible cuando existe un email pendiente de verificación en localStorage.
Previene el acceso directo a la página de verificación sin contexto.
* @author Benjamín López
* @version 1.0.0
* @since 15/11/2025
*/
export const pendingEmailGuard: CanActivateFn = () => {

   const router       = inject(Router);
   const pendingEmail = localStorage.getItem('verificationEmail');

   if (!pendingEmail) {
      router.navigateByUrl('/');
      return false;
   }

   return true;
};
