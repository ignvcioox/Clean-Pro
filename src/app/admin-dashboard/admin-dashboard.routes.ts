import { Routes } from '@angular/router';

import { AdminDashboardLayout } from '@admin-dashboard/layouts/admin-dashboard-layout/admin-dashboard-layout';
import { ProductAdminPage } from '@admin-dashboard/pages/product-admin-page/product-admin-page';
import { ProductsAdminPage } from '@admin-dashboard/pages/products-admin-page/products-admin-page';


export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    children: [
      {
        path: 'products',
        component: ProductsAdminPage,
      },
      {
        path: 'products/:id',
        component: ProductAdminPage,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default adminDashboardRoutes;
