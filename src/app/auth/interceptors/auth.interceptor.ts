import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { AuthService } from '@auth/services/auth.services';

/**
* Interceptor HTTP para autenticación JWT.
* @description Intercepta automáticamente todas las peticiones HTTP salientes
y agrega el token JWT en el header Authorization si el usuario está autenticado.
Esto permite que todas las peticiones al backend incluyan credenciales de forma transparente.
* @author Benjamín López
* @version 1.0.0
* @since 15/11/2025
*/
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

   const token  = inject(AuthService).token();
   const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
   });

   return next(newReq);
}
