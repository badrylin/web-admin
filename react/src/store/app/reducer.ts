import { AppState, DeviceType, AppActionTypes } from './types';
import { Reducer } from 'redux';

const initialState: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
};

const reducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          opened: !state.sidebar.opened,
          withoutAnimation: action.withoutAnimation,
        },
      };
    case AppActionTypes.OPEN_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          opened: true,
        },
      };
    case AppActionTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          opened: false,
        },
      };
    case AppActionTypes.TOGGLE_DEVICE:
      return {
        ...state,
        device: action.device,
      };
    default:
      return state;
  }
};

export { reducer as appReducer };
