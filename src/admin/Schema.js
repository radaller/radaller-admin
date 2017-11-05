import React from 'react';
import RichTextInput from 'aor-rich-text-input';
import BookIcon from 'material-ui/svg-icons/action/book';
import { Resource } from 'admin-on-rest';
import { List, Create, Edit, Datagrid, SimpleForm, Delete } from 'admin-on-rest';
import { EditButton, DeleteButton } from 'admin-on-rest';
import { TextInput, DisabledInput, DateInput, ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';
import { TextField, RichTextField, DateField } from 'admin-on-rest';

class Schema {
    constructor(schema) {
        this.schema = schema;
        console.log(schema);
    }

    getResourceDefinition() {
        return (
            <Resource
                key={this.schema.folder}
                name={this.schema.folder}
                options={{ label: this.schema.title }}
                list={this.getListDefinition()}
                edit={this.getEditDefinition()}
                create={this.getCreateDefinition()}
                remove={Delete}
                icon={BookIcon}/>
        );
    }

    getListDefinition() {
        return (props) => (
            <List title={this.schema.title} {...props}>
                <Datagrid>
                    <TextField source="id" />
                    {
                        this.schema.showInList.map(
                            (source) => {
                                return listFieldsMap(source, this.schema.properties[source]);
                            }
                        )
                    }
                    <DeleteButton />
                    <EditButton />
                </Datagrid>
            </List>
        );
    }

    getCreateDefinition() {
        return (props) => (
            <Create {...props}>
                <SimpleForm>
                    {
                        Object.keys(this.schema.properties).map(
                            (propertyName) => {
                                return editInputsMap(propertyName, this.schema.properties[propertyName]);
                            }
                        )
                    }
                </SimpleForm>
            </Create>
        );
    }

    getEditDefinition() {
        return (props) => (
            <Edit {...props}>
                <SimpleForm>
                    <DisabledInput source="id" />
                    {
                        Object.keys(this.schema.properties).map(
                            (propertyName) => {
                                return editInputsMap(propertyName, this.schema.properties[propertyName]);
                            }
                        )
                    }
                </SimpleForm>
            </Edit>
        );
    }
}

function listFieldsMap(propertyName, propertyData){
    console.log(propertyData);
    switch (propertyData.inputType) {
        case 'text': return (<TextField source={propertyName} key={propertyName} />);
        case 'reachtext': return (<RichTextField source={propertyName} key={propertyName} />);
        case 'date': return (<DateField source={propertyName} key={propertyName} />);
        default:
            throw new Error(propertyData.inputType + " is an invalid input type.");
    }
}

function editInputsMap(propertyName, propertyData) {
    switch (propertyData.inputType) {
        case 'text': return (<TextInput source={propertyName} key={propertyName} />);
        case 'reachtext': return (<RichTextInput source={propertyName} key={propertyName} />);
        case 'date': return (<DateInput source={propertyName} key={propertyName} />);
        case 'reference_array':
            return (
                <ReferenceArrayInput source={propertyName} reference={propertyData.referenceType} key={propertyName} allowEmpty>
                    <SelectArrayInput optionText={propertyData.referenceField} />
                </ReferenceArrayInput>
            );
        default:
            throw new Error(propertyData.inputType + " is an invalid input type.");
    }
}

export default Schema;