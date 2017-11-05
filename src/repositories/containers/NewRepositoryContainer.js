import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import OneColumnLayout from '../layouts/OneColumnLayout';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import * as routes from './../../constants/routes';


@inject("store") @observer
class NewRepositoryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isValid: true
        };
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    goToRepositories = () => {
        this.props.store.open(routes.HOME);
    };

    createRepository = () => {
        this.props.store.createRepository({name: this.state.name});
    };

    render() {
        return (
            <OneColumnLayout {...this.props}>
                <Col xs={12} >
                    <Row middle="xs" style={{height: "100%"}}>
                        <Col xs={3}>
                            <IconButton
                                iconStyle={ {width: 36, height: 36} }
                                style={ {width: 72, height: 72, padding: 16} }
                                onClick={ this.goToRepositories }
                            >
                                <ArrowLeft />
                            </IconButton>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <Col xs={12}>
                                    <TextField
                                        floatingLabelText="Repository Name"
                                        name="repository-name"
                                        type="text"
                                        fullWidth
                                        onChange={ this.onNameChange }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <RaisedButton
                                        primary={ true }
                                        fullWidth
                                        label="Create"
                                        className="submit-button"
                                        onClick={ this.createRepository }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </OneColumnLayout>
        )
    }
}

export default NewRepositoryContainer;
