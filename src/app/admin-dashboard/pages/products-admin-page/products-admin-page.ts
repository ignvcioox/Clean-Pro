import { Component, inject, OnInit, signal } from '@angular/core';

import { ProductTable } from '@products/components/product-table/product-table';
import { ProductsService } from '@products/services/products.service';

import { Product } from '@products/interfaces/product-response.interface';

@Component({
  selector: 'app-products-admin-page',
  standalone: true,
  imports: [ProductTable],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage implements OnInit {
  productsService = inject(ProductsService);
  products = signal<Product[]>([]);

  ngOnInit() {
    this.productsService.getProducts({}).subscribe(({ products }) => {
      this.products.set(products);
    });
  }
}
