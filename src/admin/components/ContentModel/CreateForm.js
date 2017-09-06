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
            options: []
        };
        this.saveField = this.saveField.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
    }

    toggleDialog() {
        this.setState({ showDialog: !this.state.showDialog })
    }

    saveField(data) {
        const { options } = this.state;
        options.push(data);
        this.setState({ options, showDialog: false });
        this.updateOptions();
    }

    updateOptions() {
        const { options } = this.state;
        let transformedOptions = {};
        options.forEach((option) => {
            const opt = {};
            opt[option.id] = {
                title: option.name,
                required: option.required,
                fieldType: option.fieldType,
                type: option.type,
            };
            transformedOptions = Object.assign({}, transformedOptions, opt);
        });

        this.props.dispatch(change('record-form', 'options', JSON.stringify(transformedOptions)));
    }

    render() {
        const { options } = this.state;

        return (
            <div>
                <SimpleForm
                    {...this.props}
                    toolbar={<FormToolbar showFieldsList={ this.toggleDialog }/>}
                >
                    <TextInput label="Title" source="title" validate={[required]}/>
                    <TextInput label="Folder" source="folder" validate={[required]}/>
                    <TextInput elStyle={{ display: 'none' }} label="Options" source="options"/>
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