import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Chip from 'material-ui/Chip';

import AutoCompleteField from '../../components/Form/AutoCompleteField';
import FieldStore from '../../stores/form/field';

import * as routes from '../../../constants/routes';

import { GitHubCms } from 'radaller-core';
import Session from '../../../Session';

const styles = {
    centering: {
        textAlign: 'center',
        padding: 15,
    },
    buttonRow: {
        marginTop: 20
    },
    chip: {
        width: '100%',
    }
};

@observer
class Repos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [],
            repos: [],
            dataSource: []
        };

        this.session = new Session(localStorage);

        this.addRepoField = this.addRepoField.bind(this);
        this.createRepo = this.createRepo.bind(this);
        this.deleteRepoField = this.deleteRepoField.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
    }

    handleUpdateInput = (value) => {
        if (value.trim().length < 5) {
            return false;
        }
        this.gitHubAPI
            .getUser()
            .listRepos()
            .then(response => {
                if (response.data && response.data.length > 0) {
                    return response.data
                        .filter(item => item.permissions.pull === true)
                        .map(item => item.full_name)
                }
                return [];
            })
            .then(items => {
                this.setState({
                    dataSource: items
                });
            });
    };

    componentDidMount() {
        const auth = this.session.getAuth();
        if (!auth) {
            this.goToLogin();
            return;
        }
        this.gitHubAPI = GitHubCms.getApi(auth);
        const repos = this.session.getRepositories();
        if (!!repos) {
            this.setState({
                repos: repos
            });
        }
    }

    addCreatedRepo(name) {
        const { repos } = this.state;
        repos.push({ name });
        this.setState({ repos });
        this.session.setRepositories(repos);
    }

    addRepoField() {
        const { fields } = this.state;
        fields.push(new FieldStore({ name: 'repo_name', placeholder: 'Enter repository name', value: '' }));
        this.setState({ fields });
    }

    createRepo(fieldIndex) {
        return () => {
            const { fields } = this.state;
            const field = fields[fieldIndex];

            field.validate();

            if (!field.error) {
                // send repo name

                this.deleteRepoField(fieldIndex);
                this.addCreatedRepo(field.value);
            }
        }
    }

    chooseRepo(repoIndex) {
        const { repos } = this.state;
        this.session.setCurrentRepository(repos[repoIndex].name);
        this.goToAdmin();
    }

    deleteRepoField(newRepoFieldIndex) {
        const { fields } = this.state;
        fields.splice(newRepoFieldIndex, 1);
        this.setState({ fields });
    }

    deleteRepo(repoIndex) {
        const { repos } = this.state;
        repos.splice(repoIndex, 1);
        this.setState({ repos });

        this.session.clearSelectedRepository();
        this.session.setRepositories(repos);
    }

    goToAdmin() {
        window.location.href = routes.ADMIN;
    }

    goToLogin() {
        this.props.history.push(routes.LOGIN);
    }

    render() {
        const { fields, repos } = this.state;
        return (
            <div style={ styles.centering }>
                {
                    repos.map((repo, repoIndex) => {
                        return (
                            <Grid fluid key={ repoIndex }>
                                <Row middle="xs">
                                    <Col xs={9} sm={10}>
                                        <Chip
                                            className="repo-item"
                                            style={ styles.chip }
                                            onClick={ () => { this.chooseRepo(repoIndex) } }
                                        >
                                            { repo.name }
                                        </Chip>
                                    </Col>
                                    <Col xs={3} sm={2}>
                                        <IconButton
                                            className="delete-repo-button"
                                            onClick={ () => { this.deleteRepo(repoIndex) } }
                                        >
                                            <DeleteIcon color={ blue500 } />
                                        </IconButton>
                                    </Col>
                                </Row>
                            </Grid>
                        )
                    })
                }

                {
                    fields.map((newRepoField, newRepoFieldIndex) => {
                        return (
                            <Grid fluid key={ newRepoFieldIndex }>
                                <Row middle="xs">
                                    <Col xs={9} sm={10}>
                                        <AutoCompleteField
                                           field={ newRepoField }
                                           dataSource={this.state.dataSource}
                                           onUpdateInput={this.handleUpdateInput}
                                           onNewRequest={ this.createRepo(newRepoFieldIndex) } />
                                    </Col>
                                    <Col xs={3} sm={2}>
                                        <IconButton
                                            onClick={ () => { this.deleteRepoField(newRepoFieldIndex) } }
                                        >
                                            <CloseIcon color={ blue500 } />
                                        </IconButton>
                                    </Col>
                                </Row>
                            </Grid>
                        )
                    })
                }
                <div style={ styles.buttonRow }>
                    <FloatingActionButton onClick={ this.addRepoField } className="add-button">
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default Repos;
