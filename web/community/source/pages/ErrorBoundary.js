import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {

  componentDidCatch(error, info){
    console.error(error, info);
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
