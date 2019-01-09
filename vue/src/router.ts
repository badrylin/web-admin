import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/layout/Layout.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */'./views/login/index.vue'),
    },
    {
      path: '',
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('./views/home/index.vue'),
          meta: { title: 'Home', icon: 'home', noCache: true },
        },
      ],
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/table',
      name: 'Example',
      meta: {title: 'Example', icon: 'example'},
      children: [
        {
          path: 'table',
          name: 'Table',
          component: () => import('./views/table/index.vue'),
          meta: {title: 'Table', icon: 'table'},
        },
        {
          path: 'tree',
          name: 'Tree',
          component: () => import('./views/table/index2.vue'),
          meta: {title: 'Tree', icon: 'tree' },
        },
      ],
    },
  ],
});
