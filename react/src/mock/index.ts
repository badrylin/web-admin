import Mock from 'mockjs';
import login from './login';

// 用户相关
Mock.mock(/\/user\/login/, 'post', login.loginByUsername);
Mock.mock(/\/user\/info/, 'get', login.getUserInfo);
Mock.mock(/\/user\/logout/, 'post', login.logout);
Mock.setup({
  timeout: '1000',
});

export default Mock;
