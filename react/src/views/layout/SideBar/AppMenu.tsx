import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import {menuData, AppRoute } from '../../../common/routerData';
import path from 'path';
import { urlToList } from '../../../utils/pathTools';
const {SubMenu, Item} = Menu;

class AppMenu extends React.PureComponent<RouteComponentProps> {
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
          title={<span><Icon type='user'/><span>{item.meta.title}</span></span>}
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
          <Icon type='user'/>
          <span>{item.meta.title}</span>
        </a>
      );
    } else {
      return (
        <Link to={resolvePath} target={item.meta.target}>
          {
            <span>
              <Icon type='user'/>
              <span>{item.meta.title}</span>
            </span>
          }
        </Link>
      );
    }
  }
  render() {
    const { location: {pathname} } = this.props;
    const pathList = urlToList(pathname);
    return(
      <Menu
        theme='dark'
        mode='inline'
        defaultOpenKeys={pathList}
        defaultSelectedKeys= {[pathname]}
      >
        {this.getMenuList(menuData)}
      </Menu>
    );
  }
}

export default withRouter(AppMenu);
