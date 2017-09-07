import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { Grid, Row, Col } from 'react-flexbox-grid';

import formatID from '../../../utils/formatID';

const button = {
    margin: '0 10px 0 0',
};

const desc = {
    fontSize: 12,
    marginBottom: 15,
};

const labelStyle = {
    fontSize: 12,
    marginLeft: '-5px',
};

const errorMsgs = {
    required: 'Field is required',
    idIsExist: 'Id with this value already exist',
};

class FieldTypesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                nameField: {
                    value: props.field.name,
                    required: false,
                    valid: true,
                    errorMsg: null,
                },
                idField: {
                    value: props.field.id,
                    blocked: props.field.id !== '',
                    valid: true,
                    errorMsg: null,
                },
            },
            requiredTxt: 'Make field required',
        };

        this.updateName = this.updateName.bind(this);
        this.updateId = this.updateId.bind(this);
        this.onSavePress = this.onSavePress.bind(this);
        this.validate = this.validate.bind(this);
        this.setRequired = this.setRequired.bind(this);
    }

    updateName(event) {
        const fields = this.state.fields;
        fields.nameField.value = event.target.value;
        fields.nameField.errorMsg = null;

        this.setState({ fields });

        if (!this.state.fields.idField.blocked) {
            this.updateId(event);
        }
    }

    updateId(event) {
        const fields = this.state.fields;
        fields.idField.value = formatID(event.target.value);
        fields.idField.errorMsg = null;
        this.setState({ fields });
    }

    setRequired(event) {
        const fields = this.state.fields;
        fields.nameField.required = event.target.checked;

        this.setState({ fields });
    }

    checkIfHasId(field, ids) {
        const hasId = ids.find((id) => field.value === id);
        return !!hasId;
    }

    validate() {
        const { fields } = this.state;
        const keys = Object.keys(fields);

        const hasId = this.checkIfHasId(fields.idField, this.props.existedFieldIds);

        fields.idField.valid = !hasId;
        fields.idField.errorMsg = errorMsgs.idIsExist;

        if(!hasId) {
            keys.forEach((key) => {
                const field = fields[key];
                field.valid = field.value !== '';
                field.errorMsg = field.valid ? null : errorMsgs.required;
            });
        }

        this.setState({ fields });
        return keys.every(key => this.state.fields[key].valid);
    }

    onSavePress() {
        const valid = this.validate();


        if (valid) {
            const fields = this.state.fields;
            const { field } = this.props;

            field.id = fields.idField.value;
            field.name = fields.nameField.value;
            field.required = fields.nameField.required;

            this.props.onSavePress(field);
        }
    }

    render() {
        const { field } = this.props;
        const { nameField, idField } = this.state.fields;
        return (
            <Grid fluid style={{ padding: 0 }}>
                <Row>
                    <Col xs={12} sm={6}>
                        <TextField
                            floatingLabelText="Name"
                            value={ nameField.value }
                            onChange={ this.updateName }
                            errorText={ nameField.errorMsg }
                            fullWidth
                        />
                        <p style={ desc }>{ field.fullDesc }</p>

                        <Checkbox
                            label={ this.state.requiredTxt }
                            checked={ nameField.required }
                            onCheck={ this.setRequired }
                            labelStyle={ labelStyle }
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <TextField
                            floatingLabelText="ID"
                            value={ idField.value }
                            fullWidth
                            disabled={ idField.blocked }
                            onChange={ this.updateId }
                            errorText={ idField.errorMsg }
                        />
                        <p style={ desc }>
                            It is generated automatically based on the name and will appear in the API responses
                        </p>
                    </Col>
                </Row>
                <Row style={ { paddingTop: 25 } }>
                    <Col xs={ 12 } sm={ 12 }>
                        <RaisedButton
                            style={ button }
                            label="Save"
                            primary={ true }
                            onClick={ this.onSavePress }
                        />
                        <RaisedButton
                            style={ button }
                            label="Change Field Type"
                            onClick={ this.props.onBackPress }
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

FieldTypesForm.propTypes = {
    field: PropTypes.object.isRequired,
    existedFieldIds: PropTypes.array.isRequired,
    onSavePress: PropTypes.func.isRequired,
    onBackPress: PropTypes.func.isRequired,
};

export default FieldTypesForm;