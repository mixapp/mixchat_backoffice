import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MenuPanel from '../Menu';
import './styles.css';
import DialogsList from '../../containers/DialogsList';
import { Spin } from 'antd';
import { withNamespaces } from 'react-i18next';


const { Content } = Layout;

class Wrapper extends React.Component {
  state = {
    collapsed: true
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
    let { location, lng } = this.props;
    let dialogsListShow = location.pathname === '/dialogs' ? '' : 'none';
    let contentClass = 'content ' + location.pathname.replace('/', '');

    /* Lng menu */

    let lngMenu = (
      <Menu>
        <Menu.Item key="0" onClick={this.changeLanguage.bind(this, 'ru-RU')}>
          <span>ru-RU</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={this.changeLanguage.bind(this, 'en-US')}>
          <div>en-US</div>
        </Menu.Item>
      </Menu>
    );

    {/*               <Header className="header">
                <div>
                  <Dropdown overlay={lngMenu} trigger={['click']}>
                    <span className="ant-dropdown-link" href="">
                      {lng} <Icon type="down" />
                    </span>
                  </Dropdown>
                </div>
              </Header>
 */}
    return (
      <div className='wrapper'>
        <div>
          <MenuPanel role={this.props.role} />
        </div>
        <div>
          <DialogsList dialogsListShow={dialogsListShow} />
          <div className='content-container'>
            {location.pathname === '/dialogs'
              ? <Content className={contentClass}>{this.props.children}</Content>
              : <Spin spinning={this.props.loader} delay={0}>
                <Content className={contentClass}>{this.props.children}</Content>
              </Spin>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(withRouter(props => <Wrapper {...props} />));