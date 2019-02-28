import { UserState, UserActionTypes as Types } from './type';
import { Reducer } from 'redux';


const initialState: UserState = {
  token: '',
  name: '',
  avatar: '',
  roles: [],
};

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case Types.GET_USER_INFOR:
      return {
        ...state,
        name: action.name,
        avatar: action.avatar,
        roles: action.roles,
      };
    case Types.LOGOUT:
      return {
        ...state,
        token: '',
        roles: [],
      };
    case Types.FED_LOGOUT:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export {reducer as userReducer};
