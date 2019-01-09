import Mock from 'mockjs';
import articleAPI from './article';
import login from './login';

// 用户相关
Mock.mock(/\/user\/login/, 'post', login.loginByUsername);
Mock.mock(/\/user\/info/, 'get', login.getUserInfo);
Mock.mock(/\/user\/logout/, 'post', login.logout);
// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);

export default Mock;
