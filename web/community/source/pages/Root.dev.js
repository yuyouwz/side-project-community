import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from '../utils/DevTools';
import { Router } from 'react-router';
import ErrorBoundary from './ErrorBoundary';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';


export default class Root extends Component {
	render() {
		const { store, history, routes } = this.props;
		return (
			<ErrorBoundary>
				<LocaleProvider locale={zhCN}>
					<Provider store={store}>
						<div className="dev-react-root">
							<Router history={history} routes={routes} />
							<DevTools />
						</div>
					</Provider>
				</LocaleProvider>
			</ErrorBoundary>
		);
	}
}




Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	routes: PropTypes.object.isRequired
};
