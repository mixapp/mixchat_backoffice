import React from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

/* Components */
import LoginForm from './components/forms/login/index';
import RegistrationForm from './components/forms/registration/index';
import Settings from './components/pages/settings';

const Index = () => {
  return (
    <div>
      <h2>Home</h2>
      <div><Link to="/login/">Login</Link></div>
    </div>
  );
}

/* Temp navigation */
const AppRouter = () => (
  <Router>
    <Row>
      <Col span={24}>
        <Route path="/" exact component={Index} />
        <Route path="/login/" component={LoginForm} />
        <Route path="/registration/" component={RegistrationForm} />
        <Route path="/company/admin/" component={Settings} />
      </Col>
    </Row>
  </Router>
);

export default AppRouter;