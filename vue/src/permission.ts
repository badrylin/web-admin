import router from './router';
import {Route} from 'vue-router';
import {getToken} from './utils/auth';
import { UserModule } from './store/modules/user';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  if (getToken()) { // 有token
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done();
    } else {
      if (UserModule.roles.length === 0) {
        UserModule.GetUserInfo().then(() => {
          next();
        }).catch((err) => {
          UserModule.FedLogout().then(() => {
            Message.error(err || '请重新登录');
          });
        });
      } else {
        next();
      }
    }
  } else { // 无token
    if (to.path === '/login') {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
