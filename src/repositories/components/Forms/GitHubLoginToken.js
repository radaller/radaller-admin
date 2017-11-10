import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import LoginVariantIcon from 'mdi-react/LoginVariantIcon';


class GitHubLoginToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            isTokenValid: true
        };
    }
    validateToken = () => {
        const isValid = this.state.token.trim() !== '';
        this.setState({isTokenValid: isValid});
        return isValid;
    };

    onGeneratePress = () => {
        this.props.onGeneratePress();
    };

    onTokenChange = (event) => {
        this.setState({ token: event.target.value });
    };

    onSubmit = () => {
        if (this.validateToken()) {
            this.props.onSubmit(this.state.token);
        }
    };

    onFieldEnter = (event) => {
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            this.onSubmit();
        }
    };

    render() {
        return [
            <Col xs={9}>
                <Row bottom="xs">
                    <Col xs={10}>
                        <TextField
                            floatingLabelText="GitHub Token"
                            name="token"
                            type="text"
                            errorText={ !this.state.isTokenValid }
                            fullWidth
                            onChange={ this.onTokenChange }
                            onBlur={ this.validateToken }
                            onKeyPress={ this.onFieldEnter }
                        />
                    </Col>
                    <Col xs={2}>
                        <IconButton
                            className="generate-button"
                            onClick={ this.onGeneratePress }
                            tooltip="Login with GitHub credentials">
                            <LoginVariantIcon/>
                        </IconButton>
                    </Col>
                </Row>
                <Row end="xs">
                    <Col xs={10}>
                        <FlatButton
                            primary={ true }
                            onClick={ this.onSubmit }
                            label="Submit"
                            className="submit-button"
                        />
                    </Col>
                    <Col xs={2}>

                    </Col>
                </Row>
            </Col>
        ]
    }
}

export default GitHubLoginToken;