import React from 'react';
import { connect } from 'react-redux';
import { setAuthorize } from '../../actions/app';
import * as Api from '../../api';

const transform = (data) => {
    const result = {};
    if (data[0] === '#') {
        data = data.substr(1);
    }
    const params = data.split('&');
    for (let i = 0; i < params.length; i++) {
        let param = params[i].split('=');
        result[param[0]] = param[1];
    }
    return result;
};

class Authorize extends React.Component {
    componentDidMount() {
        let result = transform(this.props.location.hash);

        if (result.token) {
            this.props.setAuthorize(result);
        } else {
            window.location.href = `${Api.getCurrentURL()}/${Api.getAppPath()}/`;
        }

    }
    render() {
        return <div></div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAuthorize: (result) => { dispatch(setAuthorize(result)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);