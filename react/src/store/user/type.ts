export enum UserActionTypes {
  LOGIN = '@@user/LOGIN',
  GET_USER_INFOR = '@@user/GET_USER_INFOR',
  LOGOUT = '@@user/LOGOUT',
  FED_LOGOUT = '@@user/FED_LOGOUT',
}

export interface UserState {
  readonly token: string;
  readonly name: string;
  readonly avatar: string;
  readonly roles: string[];
}
