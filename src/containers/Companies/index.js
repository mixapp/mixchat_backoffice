import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { history } from '../../store';
import { setCurrentCompany } from '../../actions/settings';
import './styles.css';
import * as Api from '../../api';


const Companies = (props) => {
  let { t } = props;
  let companies = JSON.parse(localStorage.getItem('companies'));
  let { search } = history.location;
  let redirectPath = '';
  search = search.length > 1 ? search.substr(1) : search;
  search = search.split('&');
  for (let i = 0; i < search.length; i++) {
    let a = search[i].split('=');
    if (a[0] === 'redirect') {
      redirectPath = a[1];
    }
  }

  async function clickHandler() {
    props.setCurrentCompany(this._id);
    let widget = await Api.fetchWidget(this._id);
    localStorage.setItem('rocketChatHost', widget.data.result.rocketChatHost);
    history.push(redirectPath);
  }

  let companiesList = [];

  for (let i = 0; i < companies.data.length; i++) {
    companiesList.push(
      <div key={companies.data[i]._id} className='company-list-item' onClick={clickHandler.bind(companies.data[i])}>
        <div>{companies.data[i].companyName}</div>
        <Icon type="right" />
      </div>
    )
  }
  return <div className='companies-container'>
    <div>
      <div className='company-list-item-header'>
        <h1>{t('Select company')}</h1>
      </div>
      {companiesList}
    </div>
  </div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentCompany: (data) => { dispatch(setCurrentCompany(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Companies));