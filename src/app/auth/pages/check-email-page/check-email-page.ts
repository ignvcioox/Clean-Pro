import { inject, signal, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.services';

/**
 * Página de verificación de correo electrónico para Clean Pro.
 * @description Permite al usuario ingresar el código de verificación enviado a su correo electrónico.
 * @author Benjamín López
 */
@Component({
  selector: 'app-check-email-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-email-page.html',
})
export class CheckEmailPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  email = localStorage.getItem('verificationEmail') || '';
  code = signal('');

  errorMessage = signal<string | false>(false);
  isPosting = signal(false);

  digits = Array(6).fill(0);
  codeDigits: string[] = ['', '', '', '', '', ''];

  checkEmailForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  /* isCodeComplete() {
    return this.codeDigits.every((digit) => digit && digit.length === 1);
  }

  onInput(event: any, index: number) {
    const value = event.target.value;
    if (value.length === 1 && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name='digit${index + 1}']`,
      );
      nextInput?.focus();
    }
    if (!/^\d?$/.test(value)) {
      this.codeDigits[index] = '';
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.codeDigits[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name='digit${index - 1}']`,
      );
      prevInput?.focus();
    }
  } */

  onSubmit() {
    if (this.checkEmailForm.invalid) {
      this.errorMessage.set('Ingresa el código de 6 dígitos.');
      setTimeout(() => this.errorMessage.set(false), 2000);
      return;
    }
    this.checkEmailForm;
    this.isPosting.set(true);
    this.checkEmailForm.disable();

    const code = this.checkEmailForm.value.code;

    this.authService.verifyEmail(this.email, code!).subscribe({
      next: () => {
        setTimeout(() => {
          this.isPosting.set(false);
          this.checkEmailForm.enable();
          this.router.navigateByUrl('/auth/verify-email');
        }, 1500);
      },
      error: ({ error }) => {
        setTimeout(() => {
          this.isPosting.set(false);
          this.checkEmailForm.enable();
          this.errorMessage.set(error?.message || 'Código incorrecto.');
          setTimeout(() => {
            this.errorMessage.set(false);
          }, 2000);
        }, 1500);
      },
    });
  }

  /* const email = localStorage.getItem('pendingEmailVerification');
    const code = this.codeDigits.join('');

    if (!email || code.length !== 6) {
      console.warn('[CHECK-EMAIL] Falta email o código incompleto');
      return;
    } */

  /* 
  
  onSubmit() {
    const email = localStorage.getItem('pendingEmailVerification');
    const code = this.codeDigits.join('');

    if (!email || code.length !== 6) {
      console.warn('[CHECK-EMAIL] Falta email o código incompleto');
      return;
    }

    this.isPosting.set(true);

    this.authService.verifyEmail(email, code).subscribe({
      next: () => {
        console.log('[CHECK-EMAIL] Verificación enviada correctamente');
        this.router.navigateByUrl('/auth/verify-email');
      },
      error: (err) => {
        console.error('[CHECK-EMAIL] Error desde backend:', err);
      },
    });
  }
 */
}
