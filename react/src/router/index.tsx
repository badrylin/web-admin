import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routerData from '../common/routerData';
import AppRouterChild from './Children';
import { AppRoute } from '../common/routerData';
import TablePage from '../views/table/index';
import TreePage from '../views/tree/index';
import Child1 from '../views/table/children/Child1';
import Child2 from '../views/table/children/Child2';
import path from 'path';
import AppLayout from '../views/layout';
import Home from '../views/home/index';

export default class AppRouter extends React.PureComponent {
  getRoutes = (routes: AppRoute[], basePath: string = '/') => {
    return routes.map((route) => {
      const resolePath = path.resolve(basePath, route.path);
      const resoleRedirect = route.redirect
        ? path.resolve(basePath, route.redirect)
        : path.resolve(basePath, route.path);
      const redirectsDom = routes.filter((item) => item.redirect).map((item) => {
        return <Redirect
          exact
          key={resoleRedirect}
          from={resolePath}
          to={resoleRedirect}
        ></Redirect>;
      });
      return <Route
        exact={route.exact}
        path={resolePath}
        key={resolePath}
        component={() => (
          <route.component>
            {
              route.children && route.children.length > 0 &&
              <Switch>
                {this.getRoutes(route.children, resolePath).concat(redirectsDom)}
              </Switch>
            }
          </route.component>
        )}
      />;
    });
  }
  render() {
    return (
      <BrowserRouter>
        {/* <Switch>
          <Route path='/example' component={() => (
            <AppLayout>
              <Switch>
                <Route path='/example/table' component={() => (
                  <Switch>
                    <Route path='/example/table/child1' component={Child1}></Route>
                    <Route path='/example/table/child2' component={Child2}></Route>
                    <Redirect exact from='/example/table' to='/example/table/child1'></Redirect>
                  </Switch>
                )}/>
                <Route path='/example/tree' component={TreePage}/>

                <Redirect exact from='/example' to='/example/table'></Redirect>
              </Switch>
            </AppLayout>
          )}/>
          <Route path='/' component={() => (
            <AppLayout>
              <Switch>
                <Route path='/home' component={Home}></Route>
                <Redirect exact from='/' to='/home'></Redirect>
              </Switch>
            </AppLayout>
          )}></Route>
        </Switch> */}
        <Switch>
          {this.getRoutes(routerData)}
        </Switch>
      </BrowserRouter>
    );
  }
}
