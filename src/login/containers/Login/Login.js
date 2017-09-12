import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as routes from '../../../constants/routes';
import * as storage from '../../../constants/storage';

import Snackbar from 'material-ui/Snackbar';

import LoginForm from '../../components/LoginForm/Form';
import FieldStore from '../../stores/form/field';

import Form from '../../components/Form/Form';

import { GitHubAuth, GitHubToken, UnauthorisedError, TwoFactorError } from 'radaller-core/github';

const stylesPaper = {
    padding: 15,
    paddingTop: 0,
    margin: 5,
};

@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                username: new FieldStore({ name: 'username', value: '', placeholder: 'GitHub User Name' }),
                token: { name: 'token', value: '', placeholder: 'GitHub Token' },
                password: new FieldStore({ name: 'password', value: '', placeholder: 'GitHub Password', type: 'password' }),
                code: { name: 'code', value: '', placeholder: '2FA Code' },
            },
            showLoginForm: true,
            showGenerateForm: false,
            showTwoFactorCodeForm: false,
            error: {
                open: false,
                message: ''
            }
        };

        this.gitHubAuth = new GitHubAuth(new GitHubToken());

        this.showForm = this.showForm.bind(this);
        this.onTokenSubmit = this.onTokenSubmit.bind(this);
        this.onTokenGenSubmit = this.onTokenGenSubmit.bind(this);
        this.onTwoFactorCodeSubmit = this.onTwoFactorCodeSubmit.bind(this);
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
            showTwoFactorCodeForm: form === 'code',
            showGenerateForm: form === 'generate',
        });
    }

    showError(message) {
        this.setState({
            error: {
                open: true,
                message: message
            }
        });
    }

    onTokenSubmit(formData) {
        this._authenticate(formData.token);
    }

    onTokenGenSubmit(formData) {
        this._authenticate({
            username: formData.username,
            password: formData.password,
            appName: "Radaller CMS"
        });
    }

    onTwoFactorCodeSubmit(formData) {
        this._authenticate({
            username: this.state.fields.username.value,
            password: this.state.fields.password.value,
            twoFactorCode: formData.code,
            appName: "Radaller CMS"
        });
    }

    _authenticate(credentials) {
        this._getAuthByCredentialType(credentials)
            .then(auth => {
                this._storeCredentials(auth);
                this.goToHome();
            })
            .catch(error => {
                console.log(error);
                if (error instanceof TwoFactorError) {
                    this.showForm('code');
                } else {
                    throw error;
                }
            })
            .catch(error => {
                let errorMessage = "Unknown error.";
                if (error instanceof UnauthorisedError) {
                    errorMessage = typeof credentials === "string" ? "Token is not valid." : "Credentials are not valid.";
                }
                this.showError(errorMessage);
            });
    }

    _getAuthByCredentialType(credentials) {
        if (typeof credentials === "string") {
            return this.gitHubAuth.getAuthByToken(credentials);
        } else {
            return this.gitHubAuth.getAuthByBaseAuth(credentials);
        }
    }

    _storeCredentials(auth) {
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
                            onSubmit={ this.onTokenSubmit }
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
                    this.state.showTwoFactorCodeForm && (
                        <Form
                            fields={ [this.state.fields.code] }
                            onSubmit={ this.onTwoFactorCodeSubmit }
                            onCancelPress={ () => {
                                this.showForm('login')
                            } }
                        />
                    )
                }
                <Snackbar className="error-snack"
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
