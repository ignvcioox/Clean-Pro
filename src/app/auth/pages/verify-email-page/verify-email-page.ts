import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth.services';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verify-email-page.html',
})
export class VerifyEmailPage {}
