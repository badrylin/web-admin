import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SvgIcon from 'vue-svgicon';
import 'normalize.css/normalize.css';
import store from '@/store';
import '@/registerServiceWorker';
import '@/plugins/element.ts';
import '@/styles/index.less';
import '@/icons';
import './permission';
import './mock';


Vue.config.productionTip = false;
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
