import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Product, ProductResponse } from '@products/interfaces/product-response.interface';
import { environment } from '@environments/environment';

const baseURL = environment.baseURL;

interface Options {
  limit?: number;
  offset?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 9, offset = 0 } = options;

    return this.http
      .get<ProductResponse>(`${baseURL}/products`, {
        params: { limit, offset },
      })
      .pipe(tap((resp) => console.log('Products fetched:', resp)));
  }

 
}
