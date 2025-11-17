import { Routes } from '@angular/router';
import { AuthLayout } from '@auth/layouts/auth-layout/auth-layout';

import {
   LoginPage,
   RegisterPage,
   CheckEmailPage,
   VerifyEmailPage,
   RecoveryPasswordPage,
   ResetPasswordPage,
} from '@auth/pages';

import { pendingEmailGuard } from '@auth/guards/pending-email.guard';

export const authRoutes: Routes = [
   {
      path     : '',
      component: AuthLayout,
      children : [
         {
            path     : 'login',
            component: LoginPage,
         },
         {
            path     : 'register',
            component: RegisterPage,
         },
         {
            path       : 'check-email',
            component  : CheckEmailPage,
            canActivate: [pendingEmailGuard],
         },
         {
            path     : 'verify-email',
            component: VerifyEmailPage,
         },
         {
            path     : 'recovery-password',
            component: RecoveryPasswordPage,
         },
         {
            path     : 'reset-password',
            component: ResetPasswordPage,
         },
         {
            path      : '**',
            redirectTo: 'login',
         },
      ],
   },
];

export default authRoutes;
