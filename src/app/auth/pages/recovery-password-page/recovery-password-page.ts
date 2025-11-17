import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@auth/services/auth.services';
import { IconComponent } from '@shared/icons/icon.component';

/**
 * Página de recuperación de contraseña para Clean Pro.
 * @description Permite al usuario recuperar su contraseña mediante el envío de un correo electrónico de verificación.
 * @author Benjamín López
 */
@Component({
   selector: 'app-recovery-password-page',
   standalone: true,
   imports: [ReactiveFormsModule, IconComponent],
   templateUrl: './recovery-password-page.html',
})
export class RecoveryPasswordPage {
   fb = inject(FormBuilder);
   authService = inject(AuthService);

   errorMessage = signal(false);
   successMessage = signal(false);
   isPosting = signal(false);

   recoveryPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
   });

   onSubmit() {

      if (this.recoveryPasswordForm.invalid) {
         this.recoveryPasswordForm.markAllAsTouched();
         return;
      }

      this.errorMessage.set(false);
      this.isPosting.set(true);
      this.recoveryPasswordForm.disable();

      const { email } = this.recoveryPasswordForm.value;

      this.authService.recoveryPassword(email!).subscribe({
         next: () => {
            setTimeout(() => {
               this.isPosting.set(false);
               this.recoveryPasswordForm.enable();
               this.successMessage.set(true);
            }, 1500);
         },
         error: ({ error }) => {
            const { message } = error;
            setTimeout(() => {
               this.isPosting.set(false);
               this.recoveryPasswordForm.enable();
               this.errorMessage.set(message);
               setTimeout(() => {
                  this.errorMessage.set(false);
               }, 2000);
            }, 1500);
         },
      });
   };
};

/*  onSubmit() {
  if (this.recoveryPasswordForm.invalid) {
    this.hasError.set(true);
    this.hasSuccess.set(null);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);
    return;
  }
  const { email } = this.recoveryPasswordForm.value;
  this.authService
    .recoveryPassword(email!)
    .subscribe((isRecoveryPassword) => {
      console.log('isRecoveryPassword:', isRecoveryPassword); // Depuración
      if (isRecoveryPassword) {
        this.hasSuccess.set('Se ha enviado un correo de recuperación');
        console.log('Mensaje:', this.hasSuccess()); // Depuración
        setTimeout(() => {
          this.hasSuccess.set(null);
        }, 3000);
        return;
      }
      this.hasError.set(true);
      this.hasSuccess.set(null);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    });
} */
