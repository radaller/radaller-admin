import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import TouchAppIcon from 'material-ui/svg-icons/action/touch-app';
import Chip from 'material-ui/Chip';

import Field from '../../components/Form/Field';
import FieldStore from '../../stores/form/field';

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
class AddRepo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [],
            createdRepos: []
        };

        this.addRepoField = this.addRepoField.bind(this);
        this.createRepo = this.createRepo.bind(this);
        this.deleteRepoField = this.deleteRepoField.bind(this);
    }

    addCreatedRepo(name) {
        const { createdRepos } = this.state;
        createdRepos.push({ name });
        this.setState({ createdRepos });
    }

    addRepoField() {
        const { fields } = this.state;
        fields.push(new FieldStore({ name: 'repo_name', placeholder: 'Enter repository name', value: '' }));
        this.setState({ fields });
    }

    createRepo(fieldIndex) {
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

    }

    deleteRepoField(fieldIndex) {
        const { fields } = this.state;
        fields.splice(fieldIndex, 1);
        this.setState({ fields });
    }

    deleteRepo(repoIndex) {
        const { createdRepos } = this.state;
        createdRepos.splice(repoIndex, 1);
        this.setState({ createdRepos });
    }

    render() {
        const { fields, createdRepos } = this.state;
        return (
            <div style={ styles.centering }>
                {
                    createdRepos.map((repo, repoIndex) => {
                        return (
                            <Grid fluid key={ repoIndex }>
                                <Row middle="xs">
                                    <Col xs={7} sm={9}>
                                        <Chip style={ styles.chip }>{ repo.name }</Chip>
                                    </Col>
                                    <Col xs={5} sm={3}>
                                        <IconButton
                                            onClick={ () => { this.chooseRepo(repoIndex) } }
                                        >
                                            <TouchAppIcon color={ blue500 } />
                                        </IconButton>
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
                    fields.map((field, fieldIndex) => {
                        return (
                            <Grid fluid key={ fieldIndex }>
                                <Row middle="xs">
                                    <Col xs={7} sm={9}>
                                        <Field field={ field }/>
                                    </Col>
                                    <Col xs={5} sm={3}>
                                        <IconButton
                                            onClick={ () => { this.createRepo(fieldIndex) } }
                                        >
                                            <SaveIcon color={ blue500 } />
                                        </IconButton>
                                        <IconButton
                                            onClick={ () => { this.deleteRepoField(fieldIndex) } }
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
                    <FloatingActionButton onClick={ this.addRepoField }>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default AddRepo;
