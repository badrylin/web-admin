import * as React from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from './AppMenu';
import { connect } from 'react-redux';
import { AllState } from '../../../store/index';

interface IProps {
  opened: boolean;
}
class SideBar extends React.PureComponent<IProps> {
  render() {
    return(
      <AppMenu collapsed={!this.props.opened}></AppMenu>
    );
  }
}

export default connect(({app}: AllState) => ({
  opened: app.sidebar.opened,
}))(SideBar);
