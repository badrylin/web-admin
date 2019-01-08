import Mock from 'mockjs';
import {parse} from 'url';

const List: any[] = [];
const count: number = 100;
const baseContent = '<p>test</p>';
const imageUri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@increment',
    'timestamp': + Mock
      .Random
      .date('T'),
    'author': '@first',
    'reviewer': '@first',
    'title': '@title(5, 10)',
    'content_short': '我是测试数据',
    'content': baseContent,
    'forecast': '@float(0, 100, 2, 2)',
    'importance': '@integer(1, 3)',
    'type|1': [
      'CN', 'US', 'JP', 'EU',
    ],
    'status|1': [
      'published', 'draft', 'deleted',
    ],
    'display_time': '@datetime',
    'comment_disabled': true,
    'pageviews': '@integer(300, 5000)',
    imageUri,
    'platforms': ['a-platform'],
  }));
}

export default {
  getList : (config: any) => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 20,
      sort,
    }: any = parse(config.url, true).query;
    let mockList = List.filter((item) => {
      if (importance && item.importance !== + importance) {
        return false;
      }
      if (type && item.type !== type) {
        return false;
      }
      if (title && item.title.indexOf(title) < 0) {
        return false;
      }
      return true;
    });

    if (sort === '-id') {
      mockList = mockList.reverse();
    }

    const pageList = mockList.filter((item, index) => {
      return index < limit * page && index >= limit * (page - 1);
    });

    return {total: mockList.length, items: pageList};
  },
};
