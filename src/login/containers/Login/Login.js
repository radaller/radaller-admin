import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as routes from '../../../constants/routes';
import * as storage from '../../../constants/storage';

import Snackbar from 'material-ui/Snackbar';

import LoginForm from '../../components/LoginForm/Form';
import FieldStore from '../../stores/form/field';

import Form from '../../components/Form/Form';

const Base64 = require('js-base64').Base64;

const stylesPaper = {
    padding: 15,
    paddingTop: 0,
    margin: 5,
};

function _checkTwoFactor(response) {
    console.log("check");
    console.log(response.headers.get('X-GitHub-OTP'));
    console.log(response.status);
    const twoFactor = response.headers.get('X-GitHub-OTP');
    if (twoFactor && twoFactor.indexOf("required") !== -1) {
        throw { status: response.status, twoFactor: true };
    }
    return response;
}

@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                username: new FieldStore({ name: 'username', value: '', placeholder: 'GitHub User Name' }),
                token: { name: 'token', value: '', placeholder: 'GitHub token' },
                password: new FieldStore({ name: 'password', value: '', placeholder: 'GitHub Password', type: 'password' }),
                code: { name: 'code', value: '', placeholder: '2FA Code' },
            },
            showLoginForm: true,
            showGenerateForm: false,
            showCodeForm: false,
            error: {
                open: false,
                message: ''
            }
        };

        this.showForm = this.showForm.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onTokenGenSubmit = this.onTokenGenSubmit.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    }

    componentWillMount() {
        this.goToHome();
    }

    goToHome() {
        if (!!localStorage.getItem(storage.AUTH)) {
            this.props.history.push(routes.HOME);
        }
    }

    showForm(form) {
        this.setState({
            showLoginForm: form === 'login',
            showCodeForm: form === 'code',
            showGenerateForm: form === 'generate',
        });
    }

    onLoginSubmit(data) {
        fetch('https://api.github.com/user', {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${data.token}`
            }
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Token is not valid.');
            }
            return response.json()
        })
        .then(userData => {
            this._storeCredentials(userData.login, data.token);
            this.goToHome();
        })
        .catch(() => {
            this.setState({
                error: {
                    open: true,
                    message: 'Token is not valid'
                }
            });
        });
    }

    onTokenGenSubmit(data) {
        this._generateToken(data.username, data.password);
    }

    onCodeSubmit(data) {
        const username = this.state.fields.username.value;
        const password = this.state.fields.password.value;
        const twoFactorCode = data.code;
        this._generateToken(username, password, twoFactorCode);
    }

    _generateToken(username, password, twoFactorCode) {
        this
        ._createToken(username, password, twoFactorCode)
        .then(_checkTwoFactor)
        .then(response => {
            console.log(response.status);
            console.log(response.json());
            if (response.status === 422) {
                return this
                    ._getTokens(username, password, twoFactorCode)
                    .then(response => response.json())
                    .then(tokens => {
                        const token = this._findToken(tokens, "Radaller CMS");
                        if (token) {
                            return this._deleteToken(token, username, password, twoFactorCode)
                        } else {
                            return Promise.resolve();
                        }
                    })
                    .then(() => {
                        return this._createToken(username, password, twoFactorCode);
                    })
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(data => {
            this._storeCredentials(username, data.token);
            this.goToHome();
        })
        .catch((e) => {
            console.log(e);
            if (e.twoFactor) {
                this.showForm('code');
            } else {
                this.setState({
                    error: {
                        open: true,
                        message: 'Credentials are not valid.'
                    }
                });
            }
        });
    }

    _createToken(username, password, twoFactorCode) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", 'Basic ' + Base64.encode(username + ":" + password));
        if (twoFactorCode) {
            headers.append("X-GitHub-OTP", twoFactorCode);
        }
        return fetch('https://api.github.com/authorizations', {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify({
                "scopes": [
                    "public_repo"
                ],
                "note": "Radaller CMS"
            })
        });
    }

    _getTokens(username, password, twoFactorCode) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", 'Basic ' + Base64.encode(username + ":" + password));
        if (twoFactorCode) {
            headers.append("X-GitHub-OTP", twoFactorCode);
        }
        return fetch('https://api.github.com/authorizations', {
            method: 'GET',
            mode: 'cors',
            headers: headers
        });
    }

    _findToken(tokens, note) {
        return tokens.find(token => token.note === note);
    }

    _deleteToken(token, username, password, twoFactorCode) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", 'Basic ' + Base64.encode(username + ":" + password));
        if (twoFactorCode) {
            headers.append("X-GitHub-OTP", twoFactorCode);
        }
        return fetch('https://api.github.com/authorizations/' + token.id, {
            method: 'DELETE',
            mode: 'cors',
            headers: headers
        })
    }

    _storeCredentials(login, token) {
        const auth = {
            token: token,
            username: login
        };
        localStorage.setItem('auth', JSON.stringify(auth));
    }

    handleErrorMessageClose() {
        this.setState({
            error: {
                open: false,
                message: ''
            }
        });
    }

    render() {
        return (
            <div style={ stylesPaper } elevation={ 4 }>
                {
                    this.state.showLoginForm && (
                        <LoginForm
                            fields={ [this.state.fields.token] }
                            onSubmit={ this.onLoginSubmit }
                            onTokenGeneratePress={ () => {
                                this.showForm('generate')
                            } }
                        />
                    )
                }

                {
                    this.state.showGenerateForm && (
                        <Form
                            fields={ [this.state.fields.username, this.state.fields.password] }
                            onSubmit={ this.onTokenGenSubmit }
                            onCancelPress={ () => {
                                this.showForm('login')
                            } }
                        />
                    )
                }

                {
                    this.state.showCodeForm && (
                        <Form
                            fields={ [this.state.fields.code] }
                            onSubmit={ this.onCodeSubmit }
                            onCancelPress={ () => {
                                this.showForm('login')
                            } }
                        />
                    )
                }
                <Snackbar
                    open={this.state.error.open}
                    message={this.state.error.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleErrorMessageClose}
                />
            </div>
        );
    }
}

export default Login;
