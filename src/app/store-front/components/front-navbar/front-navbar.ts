import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

import { AuthService } from '@auth/services/auth.services';

import { FrontNavbarUser } from '@store-front/components/front-navbar/front-navbar-user/front-navbar-user';
import { FrontNavbarCart } from '@store-front/components/front-navbar/front-navbar-cart/front-navbar-cart';

@Component({
  selector: 'front-navbar',
  standalone: true,
  imports: [RouterLink, FrontNavbarUser, FrontNavbarCart],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
  authService = inject(AuthService);

  scrollToId(event: Event, id: string) {
    event.preventDefault();
    const targetId = document.getElementById(id);
    if (targetId)
      targetId.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
