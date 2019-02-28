import React from 'react';
import { AppRouteComponent } from './common/routerData';
import { RouteComponentProps, withRouter } from 'react-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from './utils/auth';
import { connect } from 'react-redux';
import { AllState } from './store/index';
import { UserState } from './store/user/type';
import { GetUserInfo, FedLogout } from './store/user/actions';
import { message } from 'antd';

// 高阶函数，实现路由守卫
export const routerGuard = (Component: AppRouteComponent) => {
  return connect(({user}: AllState) => ({
    ...user,
  }))(withRouter(class extends React.Component<RouteComponentProps & UserState> {
    componentWillMount() {
      // 前置守卫
      NProgress.start();
      const {history, location, roles} = this.props;
      if (getToken()) { // 有token
        if (location.pathname === '/login') {
          history.push('/');
          NProgress.done();
        } else {
          if (roles.length === 0) {
            GetUserInfo().catch((err) => {
              FedLogout().then(() => {
                message.error(err || '请重新登录');
              });
            });
          }
        }
      } else { // 无token
        if (location.pathname !== '/login') {
          history.push(`/login?redirect=${location.pathname}`);
          NProgress.done();
        }
      }
    }
    componentDidMount() {
      // 后置守卫
      NProgress.done();
    }
    render() {
      return (<Component children={this.props.children}/>);
    }
  }));
};
