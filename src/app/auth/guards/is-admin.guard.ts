import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '@auth/services/auth.services';

/**
* Guard de autorización para rutas administrativas.
* @description Protege rutas que requieren permisos de administrador.
Verifica que el usuario esté autenticado y tenga el rol 'admin'. Si no cumple los requisitos, bloquea el acceso a la ruta.
* @author Benjamín López
* @version 1.0.0
* @since 15/11/2025
*/
export const isAdminGuard: CanMatchFn = async () => {

   const authService = inject(AuthService);

   try {
      await firstValueFrom(authService.checkStatus());
      const isAdmin = authService.isAdmin();
      return isAdmin;
   } catch (e) {
      return false;
   }
};
