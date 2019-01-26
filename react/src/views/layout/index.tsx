import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
const { Header, Content } = Layout;
import SideBar from './SideBar/index';
import './index.scss';
import NavBar from './NavBar/index';
import { AllState } from '../../store/index';
import { connect } from 'react-redux';
import { DeviceType } from '../../store/app/types';
import { closeSideBar, toggleDevice, openSideBar } from '../../store/app/actions';
const { body } = document;
const MOBLIE_WIDTH = 600;
const DESKTOP_WIDTH = 1000;

interface IProps {
  device: DeviceType;
  openSideBar: () => void;
  closeSideBar: () => void;
  toggleDevice: (device: DeviceType) => void;
}

class AppLayout extends React.Component<IProps> {
  componentWillMount() {
    window.addEventListener('resize', this.resizeHandler);
  }
  componentDidMount() {
    this.resizeHandler();
  }
  resizeHandler = () => {
    const rect = body.getBoundingClientRect();
    const isMoblie = rect.width < MOBLIE_WIDTH;
    const isBigDesktop = rect.width > DESKTOP_WIDTH;
    if (isMoblie) {
      this.props.closeSideBar();
      this.props.toggleDevice(DeviceType.Mobile);
    } else {
      if (isBigDesktop) {
        this.props.openSideBar();
      } else {
        this.props.closeSideBar();
      }
      this.props.toggleDevice(DeviceType.Desktop);
    }
  }
  render() {
    return (
      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <SideBar/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <NavBar/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Suspense fallback={<div className='main-loading'><Spin size='large'/></div>}>
              {this.props.children}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({app}: AllState) => ({
  device: app.device,
}), {
  closeSideBar,
  openSideBar,
  toggleDevice,
})(AppLayout);
