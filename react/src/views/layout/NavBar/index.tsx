import * as React from 'react';
import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Logout } from '../../../store/user/actions';

export default class NavBar extends React.Component {
  handleLogout = () => {
    Logout().then(() => {
      window.location.reload();
    });
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key='0'>
          <Link to='/home'>home</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='1'>
          <div onClick={this.handleLogout}>Logout</div>
        </Menu.Item>
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
            <img src='http://dummyimage.com/40x40' className='user-avatar'></img>
            <Icon type='caret-down' />
          </a>
        </Dropdown>
      </div>
    );
  }
}
