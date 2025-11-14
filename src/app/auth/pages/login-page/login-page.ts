import { inject, signal, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@auth/services/auth.services';

/**
 * Página de inicio de sesión para Clean Pro.
 * @description Permite al usuario autenticarse con su correo electrónico y contraseña.
 * @author Benjamín López
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  errorMessage = signal(false);
  showPassword = signal(false);
  isPosting = signal(false);

  /**
   * Formulario de inicio de sesión.
   * @description Verifica que el email sea válido y que la contraseña tenga entre 6 y 50 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
   * @author Benjamín López
   */
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[^\\s]+$',
        ),
      ],
    ],
  });

  /**
   * Alterna la visibilidad de la contraseña en el formulario.
   * @author Benjamín López
   */
  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  /**
   * Envia el formulario de inicio de sesión.
   * @description Envia el formulario, muestra un spinner mientras se procesa la solicitud y desabilita el formulario,  muestra un mensaje de error si el formulario es inválido o las credenciales son incorrectas y redirige a la página principal si el inicio de sesión es exitoso.
   * @author Benjamín López
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(false);
    this.isPosting.set(true);
    this.loginForm.disable();

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        setTimeout(() => {
          this.isPosting.set(false);
          this.loginForm.enable();
          this.router.navigateByUrl('/');
        }, 1500);
      },
      error: () => {
        setTimeout(() => {
          this.isPosting.set(false);
          this.loginForm.enable();
          this.errorMessage.set(true);
          setTimeout(() => {
            this.errorMessage.set(false);
          }, 2000);
        }, 1500);
      },
    });
  }
}
