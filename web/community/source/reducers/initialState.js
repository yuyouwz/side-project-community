
const { app } = window.setting || {};
const { name, account } = app || {};
export default {
    login: {
        fields: {
            username:'',
            password:'',
        }
    }
}