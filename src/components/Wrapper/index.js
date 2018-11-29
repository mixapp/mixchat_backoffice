import React from 'react';
import { Layout, Icon, Spin } from 'antd';
import MenuPanel from '../Menu';
import './styles.css';

const { Header, Sider, Content } = Layout;

class Wrapper extends React.Component {
  state = {
    collapsed: false,
    loading: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className="main_layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo_container">
            <div className="logo">LOGO</div>
          </div>
          <MenuPanel />
        </Sider>

        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Spin spinning={this.state.loading} delay={500}>
            <Content className="content">{this.props.children}</Content>
          </Spin>
        </Layout>
      </Layout>
    );
  }
}

export default Wrapper;