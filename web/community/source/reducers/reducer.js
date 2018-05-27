import initialState from './initialState';

import {
    UP_DATE_LOGIN_FORM
} from '../actions/actionTypes';

export const login = (state=initialState.login,action)=> {
    switch(action.type) {
        case UP_DATE_LOGIN_FORM:
        return Object.assign({},state,{
            fields:{
                ...state.fields,
                ...action.fields
            }
            
        })
        default:
        return state;
    }
}