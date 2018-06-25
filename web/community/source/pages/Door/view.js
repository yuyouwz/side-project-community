import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Door from './Door';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch) => {
    return Object.assign({},
        bindActionCreators(actions, dispatch),
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Door);
