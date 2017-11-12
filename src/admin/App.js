import React, { Component } from 'react';
import RestClient  from './RestClient';
import GitHubStorageClient from './GitHubStorageClient';
import LogoutButton from './LogoutButton';
import LinearProgress from 'material-ui/LinearProgress';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Admin, Resource, Delete, GET_LIST, CRUD_CREATE_SUCCESS, CRUD_UPDATE_SUCCESS, CRUD_DELETE_SUCCESS} from 'admin-on-rest';

import Schema from './Schema';
import Session from '../LocalStorageSession';

import { ContentModelCreate, ContentModelEdit, ContentModelList } from './containers/ContentModel';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

const SCHEMAS = 'schemas';

class App extends Component {
    constructor() {
        super();
        this.state = {
            schemas: null
        };
        this.showAdmin = this.showAdmin.bind(this);
        this.closeAdmin = this.closeAdmin.bind(this);
        this.restClient = RestClient('', GitHubStorageClient);
        this.session = new Session();
    }

    componentDidMount() {
        this.session.isAuthorised() && this.session.isRepositorySelected() && this.showAdmin();
    }

    showAdmin() {
        this.restClient(GET_LIST, SCHEMAS)
        .then(resp => {
            this.setState({schemas: resp.data});
        }).catch(e => {
            this.setState({schemas: []});
        });
    }

    closeAdmin() {
        this.session.clearSelectedRepository();
        window.location.href = "/";
    }

    schemasReducer  = (previousState = 0, {meta, type }) => {
        console.log(type);
        if (type === CRUD_CREATE_SUCCESS || type === CRUD_UPDATE_SUCCESS || type === CRUD_DELETE_SUCCESS) {
            if (meta.resource === SCHEMAS) {
                // we should reload because:
                // '<Provider> does not support changing `store` on the fly.' and
                // 'Warning: You cannot change <Router history>'
                // we can't create resources dynamic
                window.location.reload();
            }
        }
        return previousState;
    };

    render() {
        return [
            this.state.schemas === null && (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <LinearProgress mode="indeterminate" />
                </MuiThemeProvider>
            ),
            this.state.schemas !== null && (
                <Admin
                    title="Radaller"
                    restClient={ this.restClient }
                    logoutButton={ LogoutButton(this.closeAdmin) }
                    authClient={ ()=>{} }
                    customReducers={ { schemasReducer: this.schemasReducer } }
                >
                    {
                        this.state.schemas.map(item => {
                            const schema = new Schema(item);
                            return schema.getResourceDefinition();
                        })
                    }
                    <Resource
                        name={ SCHEMAS }
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