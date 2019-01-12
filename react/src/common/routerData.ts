import { Component } from 'react';
import Layout from '../views/layout/index';
import Home from '../views/home/index';
import TablePage from '../views/table/index';
import TreePage from '../views/tree/index';
import Child1 from '../views/table/children/Child1';
import Child2 from '../views/table/children/Child2';
import Child11 from '../views/table/children/children/Child1-1';
import Child12 from '../views/table/children/children/Child1-2';

export interface AppRoute {
  path: string;
  name: string;
  redirect?: string;
  exact?: boolean;
  meta?: any;
  component: typeof Component;
  children?: AppRoute[];
}

const routerData: AppRoute[] = [
  {
    path: '/',
    redirect: '/home',
    name: 'Home',
    exact: true,
    meta: { title: 'Home', icon: 'home'},
    component: Home,
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
      component: TablePage,
      meta: {title: 'Table', icon: 'table'},
      children: [{
        path: 'child1',
        name: 'Child1',
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
