import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import OneColumnLayout from '../layouts/OneColumnLayout';
import { Row, Col } from 'react-flexbox-grid';
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
        return (
            <OneColumnLayout {...this.props}>
                <Col xs={12} >
                    <Row center="xs" middle="xs" style={{height: "100%"}}>
                    {
                        this.props.store.login.isTokenType() && (
                            <GitHubLoginToken
                                onSubmit={ this.authenticate }
                                onGeneratePress={ this.useBaseType }
                            />
                        )}
                    {
                        this.props.store.login.isBaseType() && (
                            <GitHubLoginBase
                                onSubmit={ this.authenticate }
                                onCancelPress={ this.useTokenType }
                            />
                        )
                    }
                    </Row>
                </Col>
            </OneColumnLayout>
        )
    }
}

export default LoginContainer;
