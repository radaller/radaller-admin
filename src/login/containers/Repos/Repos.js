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

import Field from '../../components/Form/Field';
import FieldStore from '../../stores/form/field';

import * as routes from '../../../constants/routes';
import * as storage from '../../../constants/storage';

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
            repos: []
        };

        this.addRepoField = this.addRepoField.bind(this);
        this.createRepo = this.createRepo.bind(this);
        this.deleteRepoField = this.deleteRepoField.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem(storage.AUTH)) {
            this.goToLogin();
        }
        if (!!localStorage.getItem(storage.REPOS)) {
            this.setState({
                repos: JSON.parse(localStorage.getItem(storage.REPOS))
            });
        }
    }

    addCreatedRepo(name) {
        const { repos } = this.state;
        repos.push({ name });
        this.setState({ repos });
        this.saveReposToLocalStorage();
    }

    addRepoField() {
        const { fields } = this.state;
        fields.push(new FieldStore({ name: 'repo_name', placeholder: 'Enter repository name', value: '' }));
        this.setState({ fields });
    }

    createRepo(evt, fieldIndex) {
        if (evt.charCode !== 13) return false; // if not enter do not save

        const { fields } = this.state;
        const field = fields[fieldIndex];

        field.validate();

        if (!field.error) {
            // send repo name

            this.deleteRepoField(fieldIndex);
            this.addCreatedRepo(field.value);
        }
    }

    chooseRepo(repoIndex) {
        const { repos } = this.state;
        this.saveChosenRepoToLocalStorage(repos[repoIndex].name);
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

        localStorage.removeItem(storage.CURRENT);

        this.saveReposToLocalStorage();
    }

    saveChosenRepoToLocalStorage(name) {
        localStorage.setItem(storage.CURRENT, name);
    }

    saveReposToLocalStorage() {
        const { repos } = this.state;
        localStorage.setItem(storage.REPOS, JSON.stringify(repos));
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
                                            style={ styles.chip }
                                            onClick={ () => { this.chooseRepo(repoIndex) } }
                                        >
                                            { repo.name }
                                        </Chip>
                                    </Col>
                                    <Col xs={3} sm={2}>
                                        <IconButton
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
                                        <Field
                                           field={ newRepoField }
                                           onKeyPress={ (evt) => { this.createRepo(evt, newRepoFieldIndex) } } />
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
