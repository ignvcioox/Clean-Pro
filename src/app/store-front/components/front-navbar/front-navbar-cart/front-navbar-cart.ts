import { Component } from '@angular/core';

@Component({
  selector: 'front-navbar-cart',
  standalone: true,
  imports: [],
  templateUrl: './front-navbar-cart.html',
})
export class FrontNavbarCart {
   cartCount = 3;

   count() {
      return this.cartCount;
   }
}
