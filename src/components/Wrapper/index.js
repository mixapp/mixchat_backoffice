import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import MenuPanel from '../Menu';
import './styles.css';
import DialogsList from '../../containers/DialogsList';
import { Spin } from 'antd';

const { Header, Sider, Content } = Layout;

class Wrapper extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let { pathname } = this.props.location;
    let dialogsListShow = pathname === '/dialogs' ? '' : 'none';
    let contentClass = 'content ' + pathname.replace('/', '');
    return (
      <Layout className="main_layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo_container">
            <div className="logo">LOGO</div>
          </div>
          <MenuPanel role={this.props.role} />
        </Sider>
        <DialogsList dialogsListShow={dialogsListShow} />

        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          {pathname === '/dialogs'
            ? <Content className={contentClass}>{this.props.children}</Content>
            : <Spin spinning={this.props.loader} delay={0}>
              <Content className={contentClass}>{this.props.children}</Content>
            </Spin>
          }
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(props => <Wrapper {...props} />);