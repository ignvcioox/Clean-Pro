import { inject, signal, Component, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { delay } from 'rxjs';

import { AuthService } from '@auth/services/auth.services';
import { IconComponent } from '@shared/icons/icon.component';

/**
* Página de inicio de sesión para Clean Pro.
* @description Permite a los usuarios autenticarse mediante email y contraseña,
con validaciones en tiempo real y manejo de estados de carga y errores.
* @features
* - Validación de formularios reactivos con Angular
* - Toggle de visibilidad de contraseña
* - Estados de carga con spinner
* - Manejo de errores específicos del servidor
* - Redirección automática tras login exitoso
* @author Benjamín López
* @version 1.0.0
* @since 15/11/2025
*/
@Component({
   selector   : 'app-login-page',
   standalone : true,
   imports    : [RouterLink, ReactiveFormsModule, IconComponent],
   templateUrl: './login-page.html',
})
export class LoginPage {

   // INYECCIONES DE DEPENDENCIAS
   fb          = inject(FormBuilder);
   router      = inject(Router);
   authService = inject(AuthService);

   // SIGNALS DE ESTADOS
   errorMessage = signal(false);
   showPassword = signal(false);
   isPosting    = signal(false);

   // COMPUTED
   passwordType = computed(() => this.showPassword() ? 'text' : 'password');

   /**
   * Formulario de inicio de sesión.
   * @description Define las validaciones para email y contraseña: 
   * - Email: requerido y formato válido
   * - Contraseña: requerida, 6-50 caracteres, debe incluir: 
   *   * Al menos una minúscula
   *   * Al menos una mayúscula  
   *   * Al menos un número
   *   * Al menos un carácter especial
   *   * Sin espacios en blanco
   * @author Benjamín López
   */
   loginForm = this.fb.nonNullable.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', [
         Validators.required,
         Validators.minLength(6),
         Validators.maxLength(50),
         Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[^\\s]+$',
         )],
      ],
   });

   /**
   * Alterna la visibilidad de la contraseña en el formulario.
   * @description Cambia el estado del signal showPassword para mostrar/ocultar
   la contraseña en el campo de input.
   * @author Benjamín López
   */
   togglePassword() {
      this.showPassword.update((value) => !value);
   }

   /**
   * Procesa el envío del formulario de login.
   * @description Ejecuta el flujo completo de autenticación: 
   * 1. Valida el formulario y marca errores si es inválido
   * 2. Activa el estado de carga y deshabilita el formulario
   * 3. Envía credenciales al servicio de autenticación
   * 4. En caso de éxito: redirige a la página principal
   * 5. En caso de error: muestra mensaje y restaura el formulario
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

      const { email, password } = this.loginForm.getRawValue();


      this.authService.login(email, password).pipe(delay(1500)).subscribe({
         next: () => {
            this.isPosting.set(false);
            this.loginForm.enable();
            this.router.navigateByUrl('/');
         },
         error: (err) => {
            this.isPosting.set(false);
            this.loginForm.enable();
            this.errorMessage.set(err.error.message);
            setTimeout(() => this.errorMessage.set(false), 2000);
         }
      });
   };
};