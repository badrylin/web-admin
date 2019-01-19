import React from 'react';
import { Layout } from 'antd';
const { Header, Content } = Layout;
import SideBar from './SideBar/index';
import './index.scss';

export default class AppLayout extends React.Component<{}, {}> {
  render() {
    return (
      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <SideBar></SideBar>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
          {
            this.props.children
          }
          </Content>
        </Layout>
      </Layout>
    );
  }
}
