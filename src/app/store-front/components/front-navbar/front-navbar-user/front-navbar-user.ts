import { RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';

import { AuthService } from '@auth/services/auth.services';

@Component({
  selector: 'front-navbar-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './front-navbar-user.html',
})
export class FrontNavbarUser {
  isAccountMenu = signal(false);
  authService = inject(AuthService);

  accountMenuVisible() {
    return this.isAccountMenu();
  }

  toggleAccountMenu() {
    this.isAccountMenu.update((visible) => !visible);
  }

  accountUserInitials() {
    const user = this.authService.user();
    if (!user?.fullName) return '';
    return user.fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase();
  }
}
