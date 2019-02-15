import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Menu } from 'antd';
import {menuData, AppRoute } from '../../../common/routerData';
import path from 'path';
import { urlToList } from '../../../utils/pathTools';
import SvgIcon from '../../../components/SvgIcon/index';
import Sider from 'antd/lib/layout/Sider';
import { Location } from 'history';
const {SubMenu, Item} = Menu;
let unlisten: () => void;

interface IProps {
  collapsed: boolean;
}
type AllProps = RouteComponentProps & IProps;
interface IState {
  openKeys: string[];
  selectedKeys: string[];
}
class AppMenu extends React.PureComponent<AllProps, IState> {
  state: Readonly<IState> = {
    openKeys: [],
    selectedKeys: [],
  };
  componentDidMount() {
    this.handleRouteDidChange(this.props.location);
    // 监控路由变化
    unlisten = this.props.history.listen((location) => {
      this.handleRouteDidChange(location);
    });
  }
  componentWillUnmount() {
    unlisten();
  }
  handleRouteDidChange(location: Location) {
    const {pathname} = location;
    const pathList = urlToList(pathname);
    this.setState({
      openKeys: pathList,
      selectedKeys: [pathname],
    });
  }
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
  // 根据path类型，判断是否为http外链，生成不同MenuItem
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
  handleOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys,
    });
  }
  render() {
    const { collapsed } = this.props;
    const { openKeys, selectedKeys } = this.state;
    const props = collapsed ? {} : {
      onOpenChange: this.handleOpenChange,
      openKeys,
    };
    return(
      <Sider
        className='siderbar'
        collapsed={collapsed}
      >
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={selectedKeys}
          {...props}
        >
          {this.getMenuList(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(AppMenu);
