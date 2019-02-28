import request from '../utils/request';

export const login = (username: string, password: string) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
};

export const getUserInfo = (token: string) => {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token,
    },
  });
};

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post',
  });
};
