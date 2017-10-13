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

    authenticate(credentials) {
        this.props.store.login.authenticate(credentials)
            .then(() => {
                this.goToHome();
            })
    }

    render() {
        return [
            this.props.store.login.isTokenType() && (
                <GitHubLoginToken
                    onSubmit={ (credentials) => { this.authenticate(credentials) } }
                    onGeneratePress={ () => {
                        this.props.store.login.useBaseType()
                    } }
                />
            ),
            this.props.store.login.isBaseType() && (
                <GitHubLoginBase
                    onSubmit={ (credentials) => { this.authenticate(credentials) } }
                    onCancelPress={ () => {
                        this.props.store.login.useTokenType()
                    } }
                />
            ),
            (
                <Snackbar className="error-snack"
                   open={!!this.props.store.snackbarMessage}
                   message={this.props.store.snackbarMessage}
                   autoHideDuration={4000}
                   onRequestClose={() => this.props.store.clearSnackbarMessage()}/>
            )
        ]
    }
}

export default LoginContainer;
