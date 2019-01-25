import { AppActionTypes } from './types';

export const ToggleSideBar = (withoutAnimation: boolean) => {
  return {
    type: AppActionTypes.TOGGLE_SIDEBAR,
    withoutAnimation,
  };
};
