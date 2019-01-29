import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import MenuPanel from '../Menu';
import './styles.css';
import DialogsList from '../../containers/DialogsList';

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
    let contentClass = 'content ' + pathname.replace('/', '');
    return (
      <Layout className="main_layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo_container">
            <div className="logo">LOGO</div>
          </div>
          <MenuPanel role={this.props.role} />
        </Sider>
        {pathname === '/dialogs' && <DialogsList />}

        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className={contentClass}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(props => <Wrapper {...props} />);