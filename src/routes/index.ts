import { IRoute } from '@/typings/route';
import Layout from '@/layout';
import Login from '@/pages/login';
import Home from '@/pages/home';
import ModifyArticle from '@/pages/article/modify';
import ArticleList from '@/pages/article/index';

export const staticRoutes: IRoute[] = [
  {
    path: '/login',
    key: 'login',
    exact: true,
    name: '登录',
    component: Login,
  },
  {
    path: '/',
    key: 'root',
    exact: false,
    name: '布局',
    component: Layout,
  },
];

export const pageRoutes: IRoute[] = [
  {
    path: '/home',
    key: 'home',
    name: '首页',
    component: Home,
  },
  {
    path: '/addArticle/:id?',
    key: 'addArticle',
    name: '添加文章',
    component: ModifyArticle,
  },
  {
    path: '/articleList',
    key: 'articleList',
    name: '文章列表',
    component: ArticleList,
  },
];
