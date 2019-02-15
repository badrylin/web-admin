import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { urlToList } from '../../../utils/pathTools';

class Breadcrumb extends React.PureComponent<RouteComponentProps> {
  render() {
    const { location: {pathname} } = this.props;
    const nameList = pathname.split('/').filter((item) => !!item);
    const pathList = urlToList(pathname);
    return(
      <AntdBreadcrumb className='breadcrumb'>
        {
          pathList.map((path, index) => {
            return (
              <AntdBreadcrumb.Item key={index}>
                {
                  pathList.length - 1 === index
                  ? nameList[index]
                  : <Link to={path}>{nameList[index]}</Link>
                }
              </AntdBreadcrumb.Item>
            );
          })
        }
      </AntdBreadcrumb>
    );
  }
}

export default withRouter(Breadcrumb);
