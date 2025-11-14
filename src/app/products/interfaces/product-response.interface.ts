import { User } from '@auth/interfaces/user.interface';

export interface ProductResponse {
  count: number;
  pages: number;
  products: Product[];
}

export interface Product {
  description: string;
  id: string;
  images: string[];
  price: number;
  slug: string;
  stock: number;
  title: string;
  user: User;
}
