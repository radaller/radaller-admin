import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        // ...
        console.log("login");
    }
    if (type === AUTH_LOGOUT) {
        // ...
        console.log("logout");
        localStorage.removeItem('token');
        return Promise.resolve();

    }
    if (type === AUTH_ERROR) {
        // ...
        console.log("error");
    }
    if (type === AUTH_CHECK) {
        console.log("check");
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ redirectTo: '/login' });
    }
    return Promise.reject('Unkown method');
};