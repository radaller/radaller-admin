import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        // ...
    }
    if (type === AUTH_LOGOUT) {
        // ...

    }
    if (type === AUTH_ERROR) {
        // ...
        console.log("error");
    }
    if (type === AUTH_CHECK) {
        // ...
    }
}
