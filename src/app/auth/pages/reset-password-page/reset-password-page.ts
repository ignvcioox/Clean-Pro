import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.services';

@Component({
   selector: 'app-reset-password-page',
   standalone: true,
   imports: [ReactiveFormsModule],
   templateUrl: './reset-password-page.html',
})
export class ResetPasswordPage {
   fb = inject(FormBuilder);
   router = inject(Router);
   route = inject(ActivatedRoute);
   authService = inject(AuthService);

   errorMessage = signal(false);
   showPassword = signal(false);
   isPosting = signal(false);

   private token = this.route.snapshot.queryParams['token'] || '';

   resetPasswordForm = this.fb.group({
      newPassword: ['', [
         Validators.required,
         Validators.minLength(6),
         Validators.maxLength(50),
         Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[^\\s]+$',
         )],
      ],
   });

   togglePassword() {
      this.showPassword.update((value) => !value);
   }

   onSubmit() {
      if (this.resetPasswordForm.invalid) {
         this.resetPasswordForm.markAllAsTouched();
         return;
      }

      this.errorMessage.set(false);
      this.isPosting.set(true);
      this.resetPasswordForm.disable();

      const { newPassword } = this.resetPasswordForm.value;

      this.authService.resetPassword(this.token, newPassword!).subscribe({
         next: () => {
            setTimeout(() => {
               this.isPosting.set(false);
               this.resetPasswordForm.enable();
               this.router.navigate(['/auth/login']);
            }, 1500);
         },
         error: ({ error }) => {
            const { message } = error;
            setTimeout(() => {
               this.isPosting.set(false);
               this.resetPasswordForm.enable();
               this.errorMessage.set(message);
               setTimeout(() => {
                  this.errorMessage.set(false);
               }, 2000);
            }, 1500);
         },
      });
   };
};
