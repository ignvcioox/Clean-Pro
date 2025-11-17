import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import { Product } from '@products/interfaces/product-response.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';



import { environment } from '@environments/environment';

const baseURL = environment.baseURL;

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [ProductImagePipe, CurrencyPipe, SlicePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();

  imageUrl = computed(() => {
    return `${baseURL}/files/product/${this.product().images[0]}`;
  });
}
