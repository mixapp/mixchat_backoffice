import React from 'react';
import { Icon, Row, Col, Form } from 'antd';
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
  const formItemLayout = {
    xs: { span: 23 },
    sm: { span: 15 },
    md: { span: 9 },
    ls: { span: 8 },
    xl: { span: 7 },
    xxl: { span: 6 }
  };

  for (let i = 0; i < companies.data.length; i++) {
    companiesList.push(
      <div key={companies.data[i]._id} className='company-list-item' onClick={clickHandler.bind(companies.data[i])}>
        <div>{companies.data[i].companyName} ({companies.data[i].role})</div>
        <Icon type="right" />
      </div>
    )
  }
  return (
    <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
      <Col {...formItemLayout}>
        <h2 className='form-title'>{t('Select company')}</h2>
        <div className='tech-forms'>
          <Form>
            <Form.Item>
              {companiesList}
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  )
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