import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routerData from '../common/routerData';
import AppRouterChild from './Children';

export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        {
          routerData.map((item) => (
            <Route
              exact={item.exact}
              path={item.path}
              key={item.path}
              component={() => (
                <AppRouterChild
                  item={item}
                  basePath={item.path}
                />
              )}
            ></Route>
          ))
        }
        </Switch>
      </BrowserRouter>
    );
  }
}
