import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import {
    SimpleForm,
    TextInput,
    required
} from 'admin-on-rest';

import Divider from 'material-ui/Divider';
import FormToolbar from './Form/FormToolbar';
import Property from './Form/Property';
import Popup from './Popup';

import formatID from '../../utils/formatID';

import fieldTypesData from './fieldTypes.json';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            showDialog: false,
            properties: {},
            editProperty: null,
        };
        this.saveProperty = this.saveProperty.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.updateProperties = this.updateProperties.bind(this);
        this.editProperty = this.editProperty.bind(this);
        this.deleteProperty = this.deleteProperty.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    toggleDialog() {
        this.setState({ showDialog: !this.state.showDialog });
    }

    closeDialog() {
        this.toggleDialog();
        this.setState({ editProperty: null });
    }

    saveProperty(data) {
        const prop = {};
        prop[data.id] = data;

        const properties = Object.assign({}, this.state.properties, prop);

        this.setState({
            properties,
            showDialog: false,
            editProperty: null
        });
        this.updateProperties(properties);
    }

    updateProperties(properties) {
        let transformedProps = {};

        Object.keys(properties).forEach((key) => {
            const prop = properties[key];
            const newProp = {};
            newProp[key] = {
                title: prop.name,
                required: prop.required,
                fieldType: prop.fieldType,
                type: prop.type,
            };
            transformedProps = Object.assign({}, transformedProps, newProp);
        });
        // save properties to form
        this.props.dispatch(change('record-form', 'properties', JSON.stringify(transformedProps)));
    }

    editProperty(prop) {
        this.setState({ editProperty: prop });
        this.toggleDialog();
    }

    deleteProperty(prop) {
        const { properties } = this.state;
        delete properties[prop.id];
        this.setState({ properties });
        this.updateProperties(properties);
    }

    onTitleChange(evt) {
        // save value to folder field
        this.props.dispatch(change('record-form', 'folder', evt.target.value));
    }

    render() {
        const { properties, editProperty } = this.state;
        return (
            <div>
                <SimpleForm
                    { ...this.props }
                    toolbar={ <FormToolbar showFieldsList={ this.toggleDialog }/> }
                >
                    <TextInput label="Title" source="title" validate={ [required] } onChange={ this.onTitleChange } />
                    <TextInput label="Folder" source="folder" validate={ [required] } format={ formatID } />
                    <TextInput elStyle={ { display: 'none' } } label="type" source="type" defaultValue="object"/>

                    {
                        properties.length > 0 && (
                            <div>
                                <h3>Properties</h3>
                                <Divider />
                            </div>
                        )
                    }

                    {
                        Object.keys(properties).map((key) => {
                            const prop = properties[key];
                            return (
                                <div>
                                    <Property
                                        property={ prop }
                                        onEdit={ () => { this.editProperty(prop) } }
                                        onDelete={ () => { this.deleteProperty(prop) } }
                                    />
                                    <Divider />
                                </div>

                            )
                        })
                    }

                </SimpleForm>

                <Popup
                    title="Add new Field"
                    open={ this.state.showDialog }
                    onClose={ this.closeDialog }
                    onFieldTypeSave={ this.saveProperty }
                    fieldTypesData={ Object.assign({}, fieldTypesData) } // prevent mutation
                    editField={ editProperty }
                    existedFieldIds={ Object.keys(properties) }
                />

            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({ state, props });

export default connect(mapStateToProps)(Form);