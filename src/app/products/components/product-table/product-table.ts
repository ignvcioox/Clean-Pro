import { RouterLink } from '@angular/router';
import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product-response.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'product-table',
  standalone: true,
  imports: [ProductImagePipe, RouterLink, CurrencyPipe, SlicePipe],
  templateUrl: './product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>();
}
