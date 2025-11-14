import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@auth/services/auth.services';

@Component({
  selector: 'app-recovery-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recovery-password-page.html',
})
export class RecoveryPasswordPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  isPosting = signal(false);
  /* hasError = signal(false);
  hasSuccess = signal<string | null>(null); */

  recoveryPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.recoveryPasswordForm.invalid) return;

    this.errorMessage.set(null);
    this.successMessage.set(null);

    const { email } = this.recoveryPasswordForm.value;
    this.isPosting.set(false);

    const spinnerTimeout = setTimeout(() => {
      this.isPosting.set(true);
    }, 300);

    this.authService.recoveryPassword(email!).subscribe({
      next: () => {
        clearTimeout(spinnerTimeout);
        this.isPosting.set(false);
        this.successMessage.set(
          '¡Correo de verificación enviado correctamente!',
        );
      },
      error: (err) => {
        clearTimeout(spinnerTimeout);
        this.isPosting.set(false);
        if (
          err?.error?.message === 'El usuario ya existe' ||
          err?.message === 'El usuario ya existe'
        ) {
          this.errorMessage.set('El email ya está en uso');
        } else {
          this.errorMessage.set('Ocurrió un error. Intenta nuevamente.');
        }
      },
    });
  }

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
}
