import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
    validateToken() {
        const isValid = this.state.token.trim() !== '';
        this.setState({isTokenValid: isValid});
        return isValid;
    }
    render() {
        return (
            <Grid fluid>
                <Row bottom="xs">
                    <Col xs={8} sm={8}>
                        <TextField
                            floatingLabelText="GitHub Token"
                            name="token"
                            type="text"
                            errorText={ !this.state.isTokenValid }
                            fullWidth
                            onChange={
                                (e) => {
                                    this.setState({ token: e.target.value });
                                }
                            }
                            onBlur={ () => { this.validateToken() } }
                        />
                    </Col>
                    <Col xs={4} sm={4}>
                        <RaisedButton
                            style={ SubmitButtonStyle }
                            className="generate-button"
                            onClick={ () => { this.props.onGeneratePress(); } }
                            label="Generate"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <br/>
                        <RaisedButton
                            primary={ true }
                            onClick={ () => {
                                if (this.validateToken()) {
                                    this.props.onSubmit(this.state.token);
                                }
                            } }
                            fullWidth
                            label="Submit"
                            className="next-button"
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default GitHubLoginToken;