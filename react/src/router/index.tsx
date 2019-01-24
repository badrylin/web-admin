import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routerData, { AppRoute } from '../common/routerData';
import path from 'path';

export default class AppRouter extends React.PureComponent {
  getRoutes = (routes: AppRoute[], basePath: string = '/') => {
    return routes.map((route) => {
      const resolePath = path.resolve(basePath, route.path);
      return (
        <Route
          exact={route.exact}
          path={resolePath}
          key={resolePath}
          component={() => {
            // 重定向路由
            if (route.redirect) {
              return <Redirect
                exact={route.exact}
                key={path.resolve(basePath, route.redirect)}
                from={resolePath}
                to={path.resolve(basePath, route.redirect)}
              ></Redirect>;
            }
            // 有子路由
            if (route.children && route.children.length > 0) {
              const ChildNode = (
                <Switch>
                  {this.getRoutes(route.children, resolePath)}
                </Switch>
              );
              if (route.component) {
                return <route.component>{ChildNode}</route.component>;
              } else {
                return <Switch>{ChildNode}</Switch>;
              }
            // 无子路由
            } else {
              if (route.component) {
                return <route.component />;
              } else {
                // console.log('单个路由必须包含children或者component其中一个参数');
                return <></>;
              }
            }
          }}
        />
      );
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          {this.getRoutes(routerData)}
        </Switch>
      </Router>
    );
  }
}
