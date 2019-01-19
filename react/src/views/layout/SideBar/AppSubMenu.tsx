import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import routerData, { AppRoute } from '../../../common/routerData';
import path from 'path';
const {SubMenu, Item} = Menu;

class AppSubMenu extends React.PureComponent<RouteComponentProps> {
  getSideItems = (menusData: AppRoute[], basePath: string = '') => {
    return menusData.filter((item) => {
      return !(item.meta && item.meta.hidden);
    }).map((item) => {
      const ItemDom = this.getSubMenuOrItem(item, basePath);
      return ItemDom;
    });
  }
  getSubMenuOrItem = (item: AppRoute, basePath: string) => {
    if (item.children && item.children.length > 0) {
      const childremItems = this.getSideItems(item.children, path.resolve(basePath, item.path));
      return (
        <SubMenu
          key={path.resolve(basePath, item.path)}
          title={<span>{item.meta.title}</span>}
        >
          {childremItems}
        </SubMenu>
      );
    } else {
      return (
        <Item key={path.resolve(basePath, item.path)}>
          <Link to={path.resolve(basePath, item.path)}>
            {item.meta.title}
          </Link>
        </Item>
      );
    }
  }
  handleSelect = ({ item, key, selectedKeys }: any) => {
    console.log(item, key, selectedKeys);
  }
  handleChange = (openKeys: string[]) => {
    console.log('openKeys:', openKeys);
  }
  render() {
    // console.log('f');
    return(
      <Menu
        theme='dark'
        // defaultOpenKeys={['/example', '/example/table', '/example/table/child1']}
        // defaultSelectedKeys= {['/example/table/child1/child1-1']}
        mode='inline'
        // onSelect={this.handleChange}
        onOpenChange={this.handleChange}
      >
        {this.getSideItems(routerData)}
      </Menu>
    );
  }
}

export default withRouter(AppSubMenu);
