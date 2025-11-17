import { RouterModule } from '@angular/router';
import { Component, inject, signal, OnInit } from '@angular/core';

import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';

import { Product } from '@products/interfaces/product-response.interface';
import { Pagination } from "app/shared/components/pagination/pagination";

@Component({
   selector: 'app-home-page',
   standalone: true,
   imports: [RouterModule, ProductCard],
   templateUrl: './home-page.html',
})
export class HomePage implements OnInit {
   productsService = inject(ProductsService);
   products = signal<Product[]>([]);

   ngOnInit() {
      this.productsService.getProducts({}).subscribe(({ products }) => {
         this.products.set(products);
      });
   }
}
