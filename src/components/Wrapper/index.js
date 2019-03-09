import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
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
    let { location, xuser } = this.props;
    let dialogsListShow = location.pathname === '/dialogs' ? '' : 'none';
    let contentClass = 'content ' + location.pathname.replace('/', '');
    return (
      <div className='wrapper'>
        <div>
          {xuser && ['/companies', '/authorize'].indexOf(location.pathname) === -1 ? <MenuPanel /> : null}
        </div>
        <div>
          <DialogsList dialogsListShow={dialogsListShow} />
          <div className='content-container'>
            {location.pathname === '/dialogs' && xuser
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