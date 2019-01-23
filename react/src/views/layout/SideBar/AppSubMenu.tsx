import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import routerData, { AppRoute } from '../../../common/routerData';
import path from 'path';
import { urlToList } from '../../../utils/pathTools';
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
      const key = item.path === '/'
        ? path.resolve(basePath, item.redirect as string)
        : path.resolve(basePath, item.path);
      return (
        <SubMenu
          key={key}
          title={<span><Icon type='user'/><span>{item.meta.title}</span></span>}
        >
          {childremItems}
        </SubMenu>
      );
    } else {
      return (
        <Item key={path.resolve(basePath, item.path)}>
          <Link to={path.resolve(basePath, item.path)}>
            {<span><Icon type='user'/><span>{item.meta.title}</span></span>}
          </Link>
        </Item>
      );
    }
  }
  handleChange = (openKeys: string[]) => {
    console.log('openKeys:', openKeys);
  }
  render() {
    console.log(this.props);
    const { location: {pathname} } = this.props;
    const pathList = urlToList(pathname);
    return(
      <Menu
        theme='dark'
        inlineCollapsed={true}
        mode='inline'
        defaultOpenKeys={pathList}
        defaultSelectedKeys= {[pathname]}
        onOpenChange={this.handleChange}
      >
        {this.getSideItems(routerData)}
      </Menu>
    );
  }
}

export default withRouter(AppSubMenu);
