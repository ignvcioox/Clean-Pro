import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';

import { AuthService } from '@auth/services/auth.services';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[],
) => {
  const authService = inject(AuthService);

  try {
    await firstValueFrom(authService.checkStatus());
    const isAdmin = authService.isAdmin();
    console.log('isAdminGuard:', isAdmin);
    return isAdmin;
  } catch (e) {
    console.log('isAdminGuard error:', e);
    return false;
  }
};
