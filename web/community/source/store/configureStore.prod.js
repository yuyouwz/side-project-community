import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from '../middleware/promise';

export default function configureStore(rootReducer, preloadedState) {
    const router = routerMiddleware(browserHistory);
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunk,
            promiseMiddleware(),
            router
        )
    );
    return store;
}