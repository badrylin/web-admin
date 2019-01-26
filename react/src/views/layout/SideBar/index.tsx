import * as React from 'react';
import AppMenu from './AppMenu';
import { connect } from 'react-redux';
import { AllState } from '../../../store/index';
import { Drawer } from 'antd';
import { DeviceType } from '../../../store/app/types';
import { Dispatch } from 'redux';
import { toggleSideBar } from '../../../store/app/actions';

interface IProps {
  opened: boolean;
  device: DeviceType;
  toggleSideBar: (withoutAnimation: boolean) => void;
}
class SideBar extends React.PureComponent<IProps> {
  render() {
    const { opened, device } = this.props;
    return device === DeviceType.Mobile ? (
      <Drawer
        closable={false}
        visible={opened}
        placement='left'
        className='sidebar-drawer'
        width='auto'
        onClose={() => this.props.toggleSideBar(false)}
      >
        <AppMenu collapsed={false}></AppMenu>
      </Drawer>
    ) : (
      <AppMenu collapsed={!opened}></AppMenu>
    );
  }
}

export default connect(({app}: AllState) => ({
  opened: app.sidebar.opened,
  device: app.device,
}), {
  toggleSideBar,
})(SideBar);
