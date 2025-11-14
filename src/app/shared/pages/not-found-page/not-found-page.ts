import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {
  constructor() {
    const router = inject(Router);
    setTimeout(() => {
      router.navigateByUrl('/');
    }, 3000);
  }
}
