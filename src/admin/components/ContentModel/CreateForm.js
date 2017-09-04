import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import {
    SimpleForm,
    TextInput,
} from 'admin-on-rest';

import FormToolbar from './Create/FormToolbar';
import AddField from './FieldTypes';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            showDialog: true,
            fields: []
        };
        this.saveField = this.saveField.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
    }

    toggleDialog() {
        this.setState({ showDialog: !this.state.showDialog })
    }

    saveField(field) {
        const { fields } = this.state;
        fields.push(field);
        this.setState({ fields, showDialog: false });
        this.updateOptions();
    }

    updateOptions() {
        const { fields } = this.state;
        this.props.dispatch(change('record-form', 'options', JSON.stringify(fields)));
    }

    render() {
        const { fields } = this.state;

        return (
            <div>
                <SimpleForm {...this.props} toolbar={<FormToolbar showFieldsList={ this.toggleDialog }/>}>
                    <TextInput label="Title" source="title"/>
                    <TextInput label="Folder" source="folder" />
                    <TextInput elStyle={{ display: 'none' }} label="Options" source="options" />
                </SimpleForm>



                <AddField show={ this.state.showDialog } onSave={ this.saveField } onClose={ this.toggleDialog } />

            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({ state, props });

export default connect(mapStateToProps)(Form);