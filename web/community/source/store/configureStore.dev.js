import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from '../middleware/promise';
import DevTools from '../utils/DevTools';

export default function configureStore(rootReducer,preloadedState) {
    const logger = createLogger();
    const router = routerMiddleware(browserHistory);
    const enhancer = compose(
        applyMiddleware(
            thunk,
            promiseMiddleware(),
            logger,
            router
        ),
        DevTools.instrument()
    );
    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    );
    return store;
}
