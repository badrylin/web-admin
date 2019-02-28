import {UserActionTypes as Types} from './type';
import { login, getUserInfo, logout } from '../../services/login';
import { setToken, getToken, removeToken } from '../../utils/auth';
import { store } from '../index';
const {dispatch} = store;

// 登录
export const userLogin = async (username: string, password: string) => {
  const data: any = await login(username, password);
  setToken(data.token);
  dispatch({
    type: Types.LOGIN,
    token: data.token,
  });
};

// 获取用户数据
export const GetUserInfo = async () => {
  const token = getToken();
  if (token === undefined) {
    throw Error('GetUserInfo: token is undefined');
  }
  const data: any = await getUserInfo(token);
  if (data.roles && data.roles.length) {
    dispatch({
      type: Types.GET_USER_INFOR,
      name: data.name,
      avatar: data.avatar,
      roles: data.roles,
    });
  } else {
    throw Error('GetInfo: roles must be a non-null array!');
  }
};

// 登出
export const Logout = async () => {
  await logout();
  removeToken();
  dispatch({
    type: Types.LOGOUT,
    token: '',
    roles: [],
  });
};

// 强制登出
export const FedLogout = async () => {
  removeToken();
  dispatch({
    type: Types.FED_LOGOUT,
    token: '',
  });
};
