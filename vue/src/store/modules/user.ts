import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface IUserState {
    token: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    token: string = '';

}

export const UserModule = getModule(User);
