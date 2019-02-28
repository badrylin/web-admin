import { parse } from 'url';

interface UserMap {
  [key: string]: {
    roles: any[];
    token: string;
    introduction: string;
    avatar: string;
    name: string;
  };
}

const userMap: UserMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'http://dummyimage.com/40x40',
    name: 'Super Admin',
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'http://dummyimage.com/40x40',
    name: 'Normal Editor',
  },
};

export default {
  loginByUsername: (config: any) => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
  getUserInfo: (config: any) => {
    const { token } = parse(config.url, true).query;
    if (userMap[token as string]) {
      return userMap[token as string];
    } else {
      return false;
    }
  },
  logout: () => 'success',
};
