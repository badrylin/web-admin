import Mock from 'mockjs';
import articleAPI from './article';

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);

export default Mock;
