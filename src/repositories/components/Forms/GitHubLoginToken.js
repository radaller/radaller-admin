import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SubmitButtonStyle = {
    fontSize: 12,
    height: 30,
    lineHeight: '30px',
    marginBottom: 15
};

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
                    <Col xs={9}>
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
                    <Col xs={3}>
                        <RaisedButton
                            style={ SubmitButtonStyle }
                            className="generate-button"
                            onClick={ this.onGeneratePress }
                            label="Generate"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={9}>
                        <RaisedButton
                            primary={ true }
                            onClick={ this.onSubmit }
                            fullWidth
                            label="Submit"
                            className="submit-button"
                        />
                    </Col>
                </Row>
            </Col>
        ]
    }
}

export default GitHubLoginToken;