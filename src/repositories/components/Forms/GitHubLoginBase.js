import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { GitHubTwoFactorError } from 'radaller-core';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

class GitHubLoginBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            _2facode: "",
            isUsernameValid: true,
            isPasswordValid: true,
            is2facodeValid: true,
            is2fa: false
        };
    }

    validateUsername = () => {
        const isValid = this.state.username.trim() !== '';
        this.setState({isUsernameValid: isValid});
        return isValid;
    };

    validatePassword = () => {
        const isValid = this.state.password.trim() !== '';
        this.setState({isPasswordValid: isValid});
        return isValid;
    };

    validate2facode = () => {
        const isValid = this.state._2facode.trim() !== '';
        this.setState({is2facodeValid: isValid});
        return isValid;
    };

    validate() {
        let results = [];
        results.push(this.validateUsername());
        results.push(this.validatePassword());
        results.push(!this.state.is2fa || this.validate2facode());

        let isValid = true;
        results.forEach(value => {
            isValid *= value;
        });

        return isValid;
    }

    onSubmit = () => {
        if (this.validate()) {
            const credentials = {
                username: this.state.username,
                password: this.state.password
            };
            if (this.state.is2fa) {
                credentials.twoFactorCode = this.state._2facode;
            }
            this.props.onSubmit(credentials)
                .catch(error => {
                    if (error instanceof GitHubTwoFactorError) {
                        this.setState({ is2fa: true });
                    } else {
                        throw error;
                    }
                });
        }
    };

    onCancelPress = () => {
        this.props.onCancelPress();
    };

    render() {
        return [
            <Col xs={3}>
                <IconButton
                    iconStyle={ {width: 36, height: 36} }
                    style={ {width: 72, height: 72, padding: 16} }
                    onClick={ this.onCancelPress }
                >
                    <ArrowLeft />
                </IconButton>
            </Col>,
            <Col xs={6}>
                <Row>
                    <Col xs={12}>
                        { this.getFields() }
                    </Col>
                </Row>
                <Row end="xs">
                    <Col xs={12}>
                        <FlatButton
                            primary={ true }
                            onClick={ this.onSubmit }
                            label="Submit"
                            className="submit-button"
                        />
                    </Col>
                </Row>
            </Col>,
            <Col xs={3}>

            </Col>
        ]
    }
    getFields() {
        return [
            !this.state.is2fa && (
                <TextField
                    floatingLabelText="GitHub User Name"
                    name="username"
                    type="text"
                    errorText={ !this.state.isUsernameValid }
                    fullWidth
                    onChange={
                        (e) => {
                            this.setState({ username: e.target.value });
                        }
                    }
                    onBlur={ this.validateUsername }
                />
            ),
            !this.state.is2fa && (
                <TextField
                    floatingLabelText="GitHub Password"
                    name="password"
                    type="password"
                    errorText={ !this.state.isPasswordValid }
                    fullWidth
                    onChange={
                        (e) => {
                            this.setState({ password: e.target.value });
                        }
                    }
                    onBlur={ this.validatePassword }
                />
            ),
            this.state.is2fa && (
                <TextField
                    floatingLabelText="2FA Code"
                    name="_2facode"
                    type="text"
                    errorText={ !this.state.is2facodeValid }
                    fullWidth
                    onChange={
                        (e) => {
                            this.setState({ _2facode: e.target.value });
                        }
                    }
                    onBlur={ this.validate2facode }
                />
            )
        ];
    }
}

export default GitHubLoginBase;
