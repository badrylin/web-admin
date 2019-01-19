import * as React from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppSubMenu from './AppSubMenu';

export default class SideBar extends React.Component {
  render() {
    return(
      <Sider>
        <div className='logo' />
        <AppSubMenu></AppSubMenu>
      </Sider>
    );
  }
}
