import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@products/interfaces/product-response.interface';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {
  productService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  products = signal<Product[]>([]);

  productId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['id'])),
  );

  ngOnInit() {
   this.productService.getProducts
  }
}
