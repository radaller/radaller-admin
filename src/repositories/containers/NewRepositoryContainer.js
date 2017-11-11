import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import OneColumnLayout from '../layouts/OneColumnLayout';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
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
            errorText: '',
            isValid: true
        };
    }

    onNameChange = (event) => {
        this.setState({ name: this.formatName(event.target.value), errorText: ''});
    };

    goToRepositories = () => {
        this.props.store.open(routes.HOME);
    };

    createRepository = async () => {
        if (this.state.name === '') {
            this.setState({errorText: 'This field is required.'});
            return;
        }
        if (this.state.name.trim().length < 3) {
            this.setState({errorText: 'Name should be descriptive. (min 2 characters)'});
            return;
        }
        try {
            await this.props.store.api.getRepo(this.props.store.user.username, this.state.name).getDetails();
            this.setState({errorText: 'Repository already exist.'});
        } catch (error) {
            const repository = await this.props.store.createRepository({name: this.state.name});
            this.props.store.openRepository(repository);
        }
    };

    onFieldEnter = (event) => {
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            this.createRepository();
        }
    };

    formatName = (value) => {
        if(!value) return '';
        const trimLeadingSpaces = /^\s+/g;
        const special = /[^\w\s-]/gi;
        const spaces = /\s+/g;
        return value
            .replace(trimLeadingSpaces, '')
            .replace(special, '')
            .replace(spaces, '-')
            .toLowerCase();
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
                                        className="repository-name"
                                        value={ this.state.name }
                                        onChange={ this.onNameChange }
                                        onKeyPress={ this.onFieldEnter }
                                        errorText={ this.state.errorText }
                                    />
                                </Col>
                            </Row>
                            <Row end="xs">
                                <Col xs={12}>
                                    <FlatButton
                                        primary={ true }
                                        label="Create"
                                        className="create-submit"
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
