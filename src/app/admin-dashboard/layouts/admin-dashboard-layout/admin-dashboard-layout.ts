import { RouterOutlet } from '@angular/router';
import { Component, inject, signal } from '@angular/core';

import { AuthService } from '@auth/services/auth.services';

@Component({
  selector: 'app-admin-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-dashboard-layout.html',
})
export class AdminDashboardLayout {
  authService = inject(AuthService);
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((open) => !open);
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
