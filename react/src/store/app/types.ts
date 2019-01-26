export enum DeviceType {
  Mobile,
  Desktop,
}

export interface SideBar extends Record<string, any> {
  opened: boolean;
  withoutAnimation: boolean;
}

export enum AppActionTypes {
  TOGGLE_SIDEBAR = '@@app/TOGGLE_SIDEBAR',
  OPEN_SIDEBAR = '@@app/OPEN_SIDEBAR',
  CLOSE_SIDEBAR = '@@app/CLOSE_SIDEBAR',
  TOGGLE_DEVICE = '@@app/TOGGLE_DEVICE',
}

export interface AppState {
  readonly device: DeviceType;
  readonly sidebar: SideBar;
}
