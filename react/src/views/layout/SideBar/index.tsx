import * as React from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from './AppMenu';

export default class SideBar extends React.Component {
  render() {
    return(
      <Sider>
        <div className='logo' />
        <AppMenu></AppMenu>
      </Sider>
    );
  }
}
