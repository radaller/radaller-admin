import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import * as routes from '../../constants/routes';

import Snackbar from 'material-ui/Snackbar';
import GitHubLoginToken from '../components/Forms/GitHubLoginToken';
import GitHubLoginBase from '../components/Forms/GitHubLoginBase';

@inject("store") @observer
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                open: false,
                message: ''
            }
        };
    }

    componentWillMount() {
        if (this.props.store.user) {
            this.goToHome();
        }
    }

    goToHome() {
        this.props.history.push(routes.HOME);
    }

    showError(message) {
        this.setState({
            error: {
                open: true,
                message: message
            }
        });
    }

    handleErrorMessageClose() {
        this.setState({
            error: {
                open: false,
                message: ''
            }
        });
    }

    clearSnackbarMessage = () => {
        this.props.store.clearSnackbarMessage();
    };

    useBaseType = () => {
        this.props.store.login.useBaseType();
    };

    useTokenType = () => {
        this.props.store.login.useTokenType();
    };

    authenticate = (credentials) => {
        return this.props.store.login.authenticate(credentials)
            .then(() => {
                this.goToHome();
            })
    };

    render() {
        return [
            this.props.store.login.isTokenType() && (
                <GitHubLoginToken
                    onSubmit={ this.authenticate }
                    onGeneratePress={ this.useBaseType  }
                />
            ),
            this.props.store.login.isBaseType() && (
                <GitHubLoginBase
                    onSubmit={ this.authenticate }
                    onCancelPress={ this.useTokenType }
                />
            ),
            (
                <Snackbar className="error-snack"
                   open={!!this.props.store.snackbarMessage}
                   message={this.props.store.snackbarMessage}
                   autoHideDuration={4000}
                   onRequestClose={ this.props.store.clearSnackbarMessage }/>
            )
        ]
    }
}

export default LoginContainer;
