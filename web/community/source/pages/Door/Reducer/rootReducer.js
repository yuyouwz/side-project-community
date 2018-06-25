import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { doorReducer } from './doorReducer';
import { login } from '../../../reducers/reducer';
const rootReducer = combineReducers({
    routing: routerReducer,
    login,
    doorReducer
});


export default rootReducer;