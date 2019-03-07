import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import MenuPanel from '../Menu';
import './styles.css';
import DialogsList from '../../containers/DialogsList';
import { Spin } from 'antd';
import { withNamespaces } from 'react-i18next';
import { fethcXUSER } from '../../actions/settings';


const { Content } = Layout;

class Wrapper extends React.Component {
  state = {
    collapsed: true
  };

  componentWillMount() {
    this.props.fethcXUSER();
  }

  changeLanguage = async (lng) => {
    this.props.i18n.changeLanguage(lng);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let { location } = this.props;
    let { xuser } = this.props.app;
    let dialogsListShow = location.pathname === '/dialogs' ? '' : 'none';
    let contentClass = 'content ' + location.pathname.replace('/', '');
    return (
      <div className='wrapper'>
        <div>
          {xuser ? <MenuPanel /> : null}
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

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fethcXUSER: () => { dispatch(fethcXUSER()) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withRouter(props => <Wrapper {...props} />)));