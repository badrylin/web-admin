import { Module, VuexModule, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { login, logout } from '@/services/login';
import { setToken, removeToken, getToken } from '@/utils/auth';
import { getUserInfo } from '../../services/login';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
  token: string = '';
  name: string = '';
  avatar: string = '';
  roles: string[] = [];

  @MutationAction({ mutate: ['token'] })
  async Login(userInfo: {username: string, password: string}) {
    const username = userInfo.username.trim();
    const data: any = await login(username, userInfo.password);
    setToken(data.token);
    return {
      token: data.token,
    };
  }

  @MutationAction({ mutate: ['name', 'avatar', 'roles'] })
  async GetUserInfo() {
    const token = getToken();
    if (token === undefined) {
      throw Error('GetUserInfo: token is undefined');
    }
    const data: any = await getUserInfo(token);
    if (data.roles && data.roles.length) {
      return {
        name: data.name,
        avatar: data.avatar,
        roles: data.roles,
      };
    } else {
      throw Error('GetInfo: roles must be a non-null array!');
    }
  }

  @MutationAction({ mutate: ['token', 'roles'] })
  async Logout() {
    await logout;
    removeToken();
    return {
      token: '',
      roles: [],
    };
  }

  @MutationAction({ mutate: ['token'] })
  async FedLogout() {
    removeToken();
    return {
      token: '',
    };
  }
}

export const UserModule = getModule(User);
