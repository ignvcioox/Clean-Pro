import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const pendingEmailGuard: CanActivateFn = () => {
  const router = inject(Router);
  const pendingEmail = localStorage.getItem('pendingEmailVerification');

  if (!pendingEmail) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
