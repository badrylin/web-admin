import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
const { Header, Content } = Layout;
import SideBar from './SideBar/index';
import './index.scss';
import NavBar from './NavBar/index';

export default class AppLayout extends React.Component<{}, {}> {
  render() {
    return (
      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <SideBar/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <NavBar/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Suspense fallback={
              <div className='main-loading'>
                <Spin size='large'/>
              </div>
            }>
              {
                this.props.children
              }
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
