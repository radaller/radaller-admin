import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import {
    SimpleForm,
    TextInput,
    required
} from 'admin-on-rest';

import FormToolbar from './Create/FormToolbar';
import AddField from './FieldTypes';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            showDialog: true,
            properties: []
        };
        this.saveField = this.saveField.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
    }

    toggleDialog() {
        this.setState({ showDialog: !this.state.showDialog })
    }

    saveField(data) {
        const { properties } = this.state;
        properties.push(data);
        this.setState({ properties, showDialog: false });
        this.updateOptions();
    }

    updateOptions() {
        const { properties } = this.state;
        let transformedOptions = {};
        properties.forEach((property) => {
            const prop = {};
            prop[property.id] = {
                title: property.name,
                required: property.required,
                fieldType: property.fieldType,
                type: property.type,
            };
            transformedOptions = Object.assign({}, transformedOptions, prop);
        });

        // save properties to form
        this.props.dispatch(change('record-form', 'properties', JSON.stringify(transformedOptions)));
    }

    render() {
        return (
            <div>
                <SimpleForm
                    {...this.props}
                    toolbar={<FormToolbar showFieldsList={ this.toggleDialog }/>}
                >
                    <TextInput label="Title" source="title" validate={[required]}/>
                    <TextInput label="Folder" source="folder" validate={[required]}/>
                    <TextInput elStyle={{ display: 'none' }} label="type" source="type" defaultValue="object"/>
                </SimpleForm>


                <AddField
                    show={ this.state.showDialog }
                    onSave={ this.saveField }
                    onClose={ this.toggleDialog }
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({ state, props });

export default connect(mapStateToProps)(Form);