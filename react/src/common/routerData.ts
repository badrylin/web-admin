import React, { ComponentType, LazyExoticComponent } from 'react';
import Layout from '../views/layout/index';
const Home = React.lazy(() => import('../views/home/index'));
const TablePage = React.lazy(() => import('../views/table/index'));
const TreePage = React.lazy(() => import('../views/tree/index'));
const Child1 = React.lazy(() => import('../views/table/children/Child1'));
const Child2 = React.lazy(() => import('../views/table/children/Child2'));
const Child11 = React.lazy(() => import('../views/table/children/children/Child1-1'));
const Child12 = React.lazy(() => import('../views/table/children/children/Child1-2'));

export interface AppRoute {
  path: string;
  component: ComponentType | LazyExoticComponent<any>;
  name?: string;
  redirect?: string;
  exact?: boolean;
  meta?: any;
  children?: AppRoute[];
}

const routerData: AppRoute[] = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: 'Home', icon: 'home'},
    component: Layout,
    children: [{
      path: 'home',
      name: 'Home',
      component: Home,
      meta: { title: 'Home', icon: 'home'},
    }],
  },
  {
    path: '/always',
    redirect: '/always/home',
    component: Layout,
    meta: { title: 'Test', icon: 'test'},
    children: [{
      path: 'home',
      name: 'Home',
      component: Home,
      meta: { title: 'Home', icon: 'home'},
    }],
  },
  {
    path: '/example',
    redirect: '/example/table',
    name: 'Example',
    component: Layout,
    meta: {title: 'Example', icon: 'example'},
    children: [{
      path: 'table',
      name: 'Table',
      redirect: 'table/child1',
      component: TablePage,
      meta: {title: 'Table', icon: 'table'},
      children: [{
        path: 'child1',
        name: 'Child1',
        redirect: 'child1/child1-1',
        component: Child1,
        meta: {title: 'Child1'},
        children: [{
          path: 'child1-1',
          name: 'Child1-1',
          component: Child11,
          meta: {title: 'Child1-1'},
        }, {
          path: 'child1-2',
          name: 'Child1-2',
          component: Child12,
          meta: {title: 'Child1-2'},
        }],
      }, {
        path: 'child2',
        name: 'Child2',
        component: Child2,
        meta: {title: 'Child2'},
      }],
    }, {
      path: 'tree',
      name: 'Tree',
      component: TreePage,
      meta: {title: 'Tree', icon: 'tree'},
    }],
  },
];

export default routerData;
