import {
    UP_DATE_LOGIN_FORM
} from './actionTypes';


export const upDateLoginForm = (fields) => {
    return {
        type: UP_DATE_LOGIN_FORM,
        fields
    }
}