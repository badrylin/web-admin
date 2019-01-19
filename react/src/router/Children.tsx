import React from 'react';
import path from 'path';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AppRoute } from '../common/routerData';

interface IProps {
  item: AppRoute;
  basePath?: string;
}
export default class AppRouterChild extends React.PureComponent<IProps> {
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
          {
            item.children.map((child: AppRoute) => {
              // 判断路由是否有重定向
              if (!child.redirect) {
                return(
                  <Route
                    exact={child.exact}
                    path={this.resolvePath(basePath, child.path)}
                    key={this.resolvePath(basePath, child.path)}
                    component={() => (
                      child.children && child.children.length > 0
                      ? <AppRouterChild
                          item={child}
                          basePath={this.resolvePath(basePath, child.path)}
                        />
                      : <child.component/>
                    )}
                  ></Route>
                );
              } else {
                return([
                  <Route
                    path={path.resolve(basePath, item.redirect as string)}
                    component={() => (
                      <AppRouterChild
                        item={item}
                        basePath={path.resolve(basePath, item.path)}
                      />
                    )}
                  ></Route>,
                  <Redirect
                    exact={true}
                    from={path.resolve(basePath, item.path)}
                    to={path.resolve(basePath, item.redirect as string)}
                  ></Redirect>,
                ]);
              }
            })
          }
          </Switch>
        }
      </item.component>
    );
  }
}
