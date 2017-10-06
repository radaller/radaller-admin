import React, { Component } from 'react';
import RestClient  from './RestClient';
import GitHubStorageClient from './GitHubStorageClient';
import LogoutButton from './LogoutButton';
import LinearProgress from 'material-ui/LinearProgress';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Admin, Resource, Delete, GET_LIST } from 'admin-on-rest';

import Schema from './Schema';
import Session from '../Session';

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
        this.restClient = RestClient('', GitHubStorageClient);
        this.session = new Session(localStorage);
    }

    componentDidMount() {
        this.session.isAuthorised() && this.session.isRepositorySelected() && this.showAdmin();
    }

    showAdmin() {
        this.restClient(GET_LIST, 'schemas')
        .then(resp => {
            this.setState({schemas: resp.data});
        });
    }

    closeAdmin() {
        this.session.clearSelectedRepository();
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
                    restClient={ this.restClient }
                    logoutButton={ LogoutButton(this.closeAdmin) }
                    authClient={ ()=>{} }
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