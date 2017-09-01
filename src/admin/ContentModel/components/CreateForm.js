import React, { Component } from 'react';
import {
    SimpleForm,
    TextInput,
} from 'admin-on-rest';
import CreateModelToolbar from './shared/CreateModelToolbar';
import DataModelFields from './DataModelFields';

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            showDialog: true,
        };
        this.saveField = this.saveField.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggleDialog() {
        this.setState({ showDialog: !this.state.showDialog })
    }

    saveField() {

    }

    render() {


        return (
            <div>
                <SimpleForm {...this.props} toolbar={<CreateModelToolbar showFieldsList={ this.toggleDialog }/>}>
                    <TextInput label="Title" source="title"/>
                    <TextInput label="Folder" source="option.folder"/>


                </SimpleForm>

                <DataModelFields show={ this.state.showDialog } onSave={ this.saveField } onClose={ this.toggleDialog } />

            </div>
        )
    }
}