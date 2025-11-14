import { Routes } from '@angular/router';

import { StoreFrontLayout } from '@store-front/layouts/store-front-layout/store-front-layout';
import { HomePage } from '@store-front/pages/home-page/home-page';
import { NotFoundPage } from '@shared/pages/not-found-page/not-found-page';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];

export default storeFrontRoutes;
