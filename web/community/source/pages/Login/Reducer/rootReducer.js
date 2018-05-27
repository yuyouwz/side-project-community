import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { login } from '../../../reducers/reducer';
const rootReducer = combineReducers({
    routing: routerReducer,
    login
});

export default rootReducer;