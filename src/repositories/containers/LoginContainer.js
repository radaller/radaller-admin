import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import GitHubLoginToken from '../components/Forms/GitHubLoginToken';
import GitHubLoginBase from '../components/Forms/GitHubLoginBase';

@inject("store") @observer
class LoginContainer extends Component {

    useBaseType = () => {
        this.props.store.login.useBaseType();
    };

    useTokenType = () => {
        this.props.store.login.useTokenType();
    };

    authenticate = (credentials) => {
        return this.props.store.login.authenticate(credentials);
    };

    render() {
        return [
            this.props.store.login.isTokenType() && (
                <GitHubLoginToken
                    onSubmit={ this.authenticate }
                    onGeneratePress={ this.useBaseType }
                />
            ),
            this.props.store.login.isBaseType() && (
                <GitHubLoginBase
                    onSubmit={ this.authenticate }
                    onCancelPress={ this.useTokenType }
                />
            )
        ]
    }
}

export default LoginContainer;
