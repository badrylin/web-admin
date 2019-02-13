import * as React from 'react';
import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key='0'>
          <Link to='/home'>home</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='1'>LogOut</Menu.Item>
      </Menu>
    );
    return(
      <div className='navbar'>
        <Hamburger/>
        <Breadcrumb/>
        <Dropdown
          overlay={menu}
          trigger={['click']}
        >
          <a className='avatar-wrapper' href='#'>
            <img src='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' className='user-avatar'></img>
            <Icon type='caret-down' />
          </a>
        </Dropdown>
      </div>
    );
  }
}
