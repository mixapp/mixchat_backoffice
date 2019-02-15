import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router";
import { withRouter } from 'react-router-dom';

const getURL = (site) => {
  return 'https://api.mixapp.io/oidc/mixapp/authorize?response_type=id_token+token&client_id=5a82de9435b3820437d23cfd&redirect_uri=' + site + '/authorize&scope=openid+email+profile&state=uUpgnZBBCBMnI_GLGIzCP3AZXzavFzEVC5hM6UKB_ew&nonce=UXwkyVyGj-Lw_-zEUMbySDW2A4C5G1tYA1_HKrH0-r4&display=popup';
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!rest.app.user) {
      let { protocol, hostname, port } = window.location;
      localStorage.setItem('redirect', rest.path);
      let uri = getURL(protocol + '//' + hostname + (port !== 80 ? ':' + port : 80));
      //console.log(uri);
      window.location.href = uri;
      return null;
    }
    return rest.app.user ? <Component {...props} /> : null;
  }} />
)


const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));