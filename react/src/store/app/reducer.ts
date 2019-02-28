import { AppState, DeviceType, AppActionTypes as Types } from './types';
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
    case Types.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          opened: !state.sidebar.opened,
          withoutAnimation: action.withoutAnimation,
        },
      };
    case Types.OPEN_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          opened: true,
        },
      };
    case Types.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          opened: false,
        },
      };
    case Types.TOGGLE_DEVICE:
      return {
        ...state,
        device: action.device,
      };
    default:
      return state;
  }
};

export { reducer as appReducer };
