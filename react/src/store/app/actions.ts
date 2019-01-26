import { AppActionTypes, DeviceType } from './types';

export const toggleSideBar = (withoutAnimation: boolean) => {
  return {
    type: AppActionTypes.TOGGLE_SIDEBAR,
    withoutAnimation,
  };
};

export const openSideBar = () => {
  return {
    type: AppActionTypes.OPEN_SIDEBAR,
  };
};

export const closeSideBar = () => {
  return {
    type: AppActionTypes.CLOSE_SIDEBAR,
  };
};

export const toggleDevice = (device: DeviceType) => {
  return {
    type: AppActionTypes.TOGGLE_DEVICE,
    device,
  };
};
