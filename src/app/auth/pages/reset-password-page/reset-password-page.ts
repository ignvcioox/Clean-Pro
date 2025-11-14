import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-page.html',
})
export class ResetPasswordPage {
  fb = inject(FormBuilder);

  resetPasswordForm = this.fb.group({
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[^\s]+$',
        ),
      ],
    ],
  });

  onSubmit() {
   
  }
}
