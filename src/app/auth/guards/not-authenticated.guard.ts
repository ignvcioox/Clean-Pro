import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '@auth/services/auth.services';

export const NotAuthenticatedGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  if (isAuthenticated) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
