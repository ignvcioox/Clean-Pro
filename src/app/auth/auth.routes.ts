import { Routes } from '@angular/router';
import { AuthLayout } from '@auth/layouts/auth-layout/auth-layout';

import { LoginPage } from '@auth/pages/login-page/login-page';
import { RegisterPage } from '@auth/pages/register-page/register-page';
import { RecoveryPasswordPage } from '@auth/pages/recovery-password-page/recovery-password-page';
import { ResetPasswordPage } from '@auth/pages/reset-password-page/reset-password-page';
import { VerifyEmailPage } from '@auth/pages/verify-email-page/verify-email-page';
import { CheckEmailPage } from '@auth/pages/check-email-page/check-email-page';

import { pendingEmailGuard } from '@auth/guards/pending-email.guard';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
      {
        path: 'check-email',
        component: CheckEmailPage,
        canActivate: [pendingEmailGuard],
      },
      {
        path: 'verify-email',
        component: VerifyEmailPage,
      },
      {
        path: 'recovery-password',
        component: RecoveryPasswordPage,
      },
      {
        path: 'reset-password',
        component: ResetPasswordPage,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;
