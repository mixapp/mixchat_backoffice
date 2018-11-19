import React from 'react';
import { connect } from 'react-redux';

const Dialogs = () => {
    return <div>
        <h1>Диалоги</h1>
        <div>
        Search for the keywords to learn more about each warning. To ignore, add // eslint-disable-next-line to the line before.
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);