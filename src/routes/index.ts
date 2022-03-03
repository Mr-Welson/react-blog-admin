import Home from '@/pages/home';
import { IRoute } from '@/typings/route';

export const pageRoutes: IRoute[] = [
  {
    path: '/home',
    key: 'home',
    name: '首页',
    component: Home,
  },
];
