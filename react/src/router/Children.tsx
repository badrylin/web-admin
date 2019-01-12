import React from 'react';
import path from 'path';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../common/routerData';

interface IProps {
  item: AppRoute;
  basePath?: string;
}
export default class AppRouterChild extends React.Component<IProps> {
  resolvePath = (basePath: string, routePath: string): string => {
    return path.resolve(basePath, routePath);
  }
  render() {
    const {item, basePath = ''} = this.props;
    return (
      <item.component>
        {
          item.children && item.children.length > 0 &&
          <Switch>
            {item.children.map((child) => (
              <Route
                exact={child.exact}
                path={this.resolvePath(basePath, child.path)}
                component={() => (
                  child.children && child.children.length > 0
                  ? <AppRouterChild
                      item={child}
                      basePath={this.resolvePath(basePath, child.path)}
                    />
                  : <child.component/>
                )}
                key={child.path}
              ></Route>
            ))}
          </Switch>
        }
      </item.component>
    );
  }
}
