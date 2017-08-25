import React, {Component} from 'react';
import radallerRestClient  from './radaller-rest-client';
import authClient from './authClient';
import RichTextInput from 'aor-rich-text-input';
import LoginApp from './login/containers/App/App';
import { Admin, Resource, GET_LIST,
    List,
    Create,
    Edit,
    Datagrid,
    SimpleForm,
    TextInput,
    DisabledInput,
    EditButton,
    DeleteButton,
    TextField,
    Delete,
    DateInput,
    RichTextField,
    DateField,
    ReferenceArrayInput,
    SelectArrayInput
} from 'admin-on-rest';

const cmsRestClient = radallerRestClient('http://localhost:8080');

const listFieldsMap = (propertyName, propertyData) => {
    switch (propertyData.inputType) {
        case 'text': return (<TextField source={propertyName} key={propertyName} />);
        case 'reachtext': return (<RichTextField source={propertyName} key={propertyName} />);
        case 'date': return (<DateField source={propertyName} key={propertyName} />);
        default:
            throw new Error(propertyData.inputType + " is an invalid input type.");
    }
};

const editInputsMap = (propertyName, propertyData) => {
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
};

function getListDefinition(item) {
    return (props) => (
        <List title={item.title} {...props}>
            <Datagrid>
                <TextField source="id" />
                {
                    item.showInList.map(
                        (source) => {
                            return listFieldsMap(source, item.properties[source]);
                        }
                    )
                }
                <DeleteButton />
                <EditButton />
            </Datagrid>
        </List>
    );
}

function getCreateDefinition(item) {
    return (props) => (
        <Create {...props}>
            <SimpleForm>
                {
                    Object.keys(item.properties).map(
                        (propertyName) => {
                            return editInputsMap(propertyName, item.properties[propertyName]);
                        }
                    )
                }
            </SimpleForm>
        </Create>
    );
}

function getEditDefinition(item) {
    return (props) => (
        <Edit {...props}>
            <SimpleForm>
                <DisabledInput source="id" />
                {
                    Object.keys(item.properties).map(
                        (propertyName) => {
                            return editInputsMap(propertyName, item.properties[propertyName]);
                        }
                    )
                }
            </SimpleForm>
        </Edit>
    );
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            items:[]
        };
        this._getResourceDefinition = this._getResourceDefinition.bind(this);
    }

    componentDidMount() {
        this._getResourceDefinition();
    }

    _getResourceDefinition() {
        cmsRestClient(GET_LIST, 'schemas', {
            pagination: {
                page: 1,
                perPage: 100
            },
            sort: {},
            filter: {}
        })
        .then(resp => {
            this.setState({items: resp.data});
        });
    }

    render() {
        if (this.state.items.length === 0) return false;

        return (
            <Admin  restClient={cmsRestClient} authClient={authClient}>
                {
                    this.state.items.map((item, index) => {
                        return (
                            <Resource
                                key={index}
                                name={item.folder}
                                options={{ label: item.title }}
                                list={getListDefinition(item)}
                                edit={getEditDefinition(item)}
                                create={getCreateDefinition(item)}
                                remove={Delete}/>
                        );
                    })
                }
            </Admin>
        )
    }
}

export default App;