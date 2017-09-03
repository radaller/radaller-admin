import React, {Component} from 'react';
import radallerRestClient  from './radaller-rest-client';
import authClient from './authClient';
import RichTextInput from 'aor-rich-text-input';
import githubHttpClient from './github-http-client';
import LogoutButton from './LogoutButton';
import LinearProgress from 'material-ui/LinearProgress';
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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();

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
            schemas:[]
        };
        this.showAdmin = this.showAdmin.bind(this);
        this.closeAdmin = this.closeAdmin.bind(this);
    }

    componentDidMount() {
        if (this._checkAuth() && this._checkCurrentRepo()) {
            this.showAdmin();
        }
    }

    _getRestClient() {
        return radallerRestClient('', githubHttpClient);
    }

    _checkCurrentRepo() {
        return !!localStorage.getItem('current');
    }

    _checkAuth() {
        return !!localStorage.getItem('auth');
    }

    showAdmin() {
        const restClient = this._getRestClient();
        restClient(GET_LIST, 'schemas', {
            pagination: {
                page: 1,
                perPage: 100
            },
            sort: {},
            filter: {}
        })
        .then(resp => {
            this.setState({schemas: resp.data});
        });
    }

    closeAdmin() {
        localStorage.removeItem('current');
        window.location.href = "/";
    }

    render() {
        return (
            <div>
            {
                this.state.schemas.length === 0 && (
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <LinearProgress mode="indeterminate" />
                    </MuiThemeProvider>
                )
            }
            {
                this.state.schemas.length > 0 && (
                    <Admin restClient={this._getRestClient()} logoutButton={LogoutButton(this.closeAdmin)} authClient={authClient}>
                        {
                            this.state.schemas.map((item, index) => {
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
            </div>
        )
    }
}

export default App;