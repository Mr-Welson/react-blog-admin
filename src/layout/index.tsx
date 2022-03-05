import React, { useState } from 'react';
import { IRoute } from '@/typings/route';
import { Switch, Route } from 'react-router-dom';
import { pageRoutes } from '@/routes';
import './index.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, MessageOutlined, FileAddOutlined, FileOutlined, BarsOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = () => {
    setCollapsed((v) => !v);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo'></div>
        <Menu theme='dark' defaultSelectedKeys={['workspace']} mode='inline'>
          <Menu.Item key='workspace'>
            <DesktopOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key='addArticle'>
            <FileAddOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <Menu.SubMenu
            key='article'
            title={
              <span>
                <FileOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key='add'>
              <FileAddOutlined />
              <span>添加文章</span>
            </Menu.Item>
            <Menu.Item key='list'>
              <BarsOutlined />
              <span>文章列表</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='message'>
            <MessageOutlined />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}></Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Switch>
              {pageRoutes.map((route: IRoute) => (
                <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
              ))}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Blog Admin</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
