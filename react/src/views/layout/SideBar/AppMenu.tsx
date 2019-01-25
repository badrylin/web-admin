import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Menu } from 'antd';
import {menuData, AppRoute } from '../../../common/routerData';
import path from 'path';
import { urlToList } from '../../../utils/pathTools';
import SvgIcon from '../../../components/SvgIcon/index';
import Sider from 'antd/lib/layout/Sider';
const {SubMenu, Item} = Menu;

interface IProps {
  collapsed: boolean;
}
type AllProps = RouteComponentProps & IProps;
class AppMenu extends React.PureComponent<AllProps> {
  // 获取菜单列表
  getMenuList = (menusData: AppRoute[], basePath: string = '') => {
    return menusData.filter((item) => {
      return !(item.meta && item.meta.hidden) && !item.redirect;
    }).map((item) => {
      const ItemDom = this.getSubMenuOrItem(item, basePath);
      return ItemDom;
    });
  }
  // 获取菜单子项
  getSubMenuOrItem = (item: AppRoute, basePath: string) => {
    const resolePath = path.resolve(basePath, item.path);
    if (item.children && item.children.length > 0) {
      const childremItems = this.getMenuList(item.children, resolePath);
      return (
        <SubMenu
          key={resolePath}
          title={<><SvgIcon name={item.meta.icon}/><span>{item.meta.title}</span></>}
        >
          {childremItems}
        </SubMenu>
      );
    } else {
      return (
        <Item key={resolePath}>
          {this.getMenuItemLink(item, resolePath)}
        </Item>
      );
    }
  }
  // 判断path是否为http外链
  getMenuItemLink = (item: AppRoute, resolvePath: string) => {
    if (/^https?:\/\//.test(item.path)) {
      return (
        <a href={item.path} target={item.meta.target}>
          <SvgIcon name={item.meta.icon}/>
          <span>{item.meta.title}</span>
        </a>
      );
    } else {
      return (
        <Link to={resolvePath} target={item.meta.target}>
          <SvgIcon name={item.meta.icon}/>
          <span>{item.meta.title}</span>
        </Link>
      );
    }
  }
  render() {
    const { location: {pathname} } = this.props;
    const pathList = urlToList(pathname);
    return(
      <Sider
        className='siderbar'
        collapsed={this.props.collapsed}
      >
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultOpenKeys={pathList}
          defaultSelectedKeys= {[pathname]}
        >
          {this.getMenuList(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(AppMenu);
