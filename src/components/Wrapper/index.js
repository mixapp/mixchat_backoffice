import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import MenuPanel from '../Menu';
import './styles.css';
import DialogsList from '../../containers/DialogsList';
import { Spin } from 'antd';
import { withNamespaces } from 'react-i18next';


const { Header, Sider, Content } = Layout;

class Wrapper extends React.Component {
  state = {
    collapsed: false
  };

  changeLanguage = async (lng) => {
    this.props.i18n.changeLanguage(lng);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let { location, lng, t } = this.props;
    let dialogsListShow = location.pathname === '/dialogs' ? '' : 'none';
    let contentClass = 'content ' + location.pathname.replace('/', '');

    /* Lng menu */

    let lngMenu = (
      <Menu>
        <Menu.Item key="0" onClick={this.changeLanguage.bind(this, 'ru')}>
          <span>Russian</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={this.changeLanguage.bind(this, 'en')}>
          <div>English</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );

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
            <div>
              <Dropdown overlay={lngMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  {lng} <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Header>
          {location.pathname === '/dialogs'
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

export default withNamespaces()(withRouter(props => <Wrapper {...props} />));