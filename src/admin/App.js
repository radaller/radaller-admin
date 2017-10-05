import React, { Component } from 'react';
import RestClient  from './RestClient';
import GitHubStorageClient from './GitHubStorageClient';
import LogoutButton from './LogoutButton';
import LinearProgress from 'material-ui/LinearProgress';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Admin, Resource, Delete, GET_LIST} from 'admin-on-rest';

import Schema from './Schema';

import { ContentModelCreate, ContentModelEdit, ContentModelList } from './containers/ContentModel';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

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
        return RestClient('', GitHubStorageClient);
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
        return [
            this.state.schemas.length === 0 && (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <LinearProgress mode="indeterminate" />
                </MuiThemeProvider>
            ),
            this.state.schemas.length > 0 && (
                <Admin
                    title="Radaller"
                    restClient={this._getRestClient()}
                    logoutButton={LogoutButton(this.closeAdmin)}
                    authClient={()=>{}}
                >
                    {
                        this.state.schemas.map(item => {
                            const schema = new Schema(item);
                            return schema.getResourceDefinition();
                        })
                    }
                    <Resource
                        name="schemas"
                        options={{ label: "Content Model" }}
                        list={ ContentModelList }
                        create={ ContentModelCreate }
                        edit={ ContentModelEdit }
                        remove={Delete}
                        icon={AddIcon}
                    />
                </Admin>
            )
        ]
    }
}

export default App;