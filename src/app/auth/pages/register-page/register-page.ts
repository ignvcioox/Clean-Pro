import { inject, signal, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@auth/services/auth.services';

/**
 * Página de registro para Clean Pro.
 * @description Permite al usuario registrarse con su nombre completo, correo electrónico y contraseña.
 * @author Benjamín López
 */
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  errorMessage = signal(false);
  showPassword = signal(false);
  isPosting = signal(false);

  /**
   * Formulario de registro.
   * @description Verifica que el nombre completo tenga entre 3 y 50 caracteres, que el email sea un email válido y que la contraseña tenga entre 6 y 50 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
   * @author Benjamín López
   */
  registerForm = this.fb.group({
    fullName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
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
   * Formulario de registro.
   * @description Envia el formulario, muestra un spinner mientras se procesa la solicitud y desabilita el formulario, 
   muestra un mensaje de error si el formulario es inválido o las credenciales son incorrectas y redirige a la página de verificación de correo electrónico si el registro es exitoso.
   */
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(false);
    this.isPosting.set(true);
    this.registerForm.disable();

    const { fullName, email, password } = this.registerForm.value;

    this.authService.register(fullName!, email!, password!).subscribe({
      next: () => {
        localStorage.setItem('verificationEmail', email!);
        setTimeout(() => {
          this.isPosting.set(false);
          this.registerForm.enable();
          this.router.navigateByUrl('/auth/check-email');
        }, 1500);
      },
      error: ({ error }) => {
        const { message } = error;
        console.log(message);
        setTimeout(() => {
          this.isPosting.set(false);
          this.registerForm.enable();
          this.errorMessage.set(message);
          setTimeout(() => {
            this.errorMessage.set(false);
          }, 2000);
        }, 1500);
      },
    });
  }
}
