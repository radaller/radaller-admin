import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import SaveIcon from 'material-ui-icons/Save';
import CloseIcon from 'material-ui-icons/Close';
import DeleteIcon from 'material-ui-icons/Delete';
import TouchAppIcon from 'material-ui-icons/TouchApp';
import Grid from 'material-ui/Grid';
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
class App extends Component {
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
        const classes = this.props.classes;
        const { fields, createdRepos } = this.state;
        return (
            <div className={ classes.centering }>
                {
                    createdRepos.map((repo, repoIndex) => {
                        return (
                            <Grid key={ repoIndex } container spacing={24} align={'center'}>
                                <Grid item xs={7} sm={9}>
                                    <Chip label={ repo.name } className={ classes.chip } />
                                </Grid>
                                <Grid item xs={5} sm={3}>
                                    <IconButton
                                        color="primary"
                                        onClick={ () => { this.chooseRepo(repoIndex) } }
                                    >
                                        <TouchAppIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={ () => { this.deleteRepo(repoIndex) } }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )
                    })
                }

                {
                    fields.map((field, fieldIndex) => {
                        return (
                            <Grid key={ fieldIndex } container spacing={24} align={'center'}>
                                <Grid item xs={7} sm={9}>
                                    <Field field={ field }/>
                                </Grid>
                                <Grid item xs={5} sm={3}>
                                    <IconButton
                                        color="primary"
                                        onClick={ () => { this.createRepo(fieldIndex) } }
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={ () => { this.deleteRepoField(fieldIndex) } }
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )
                    })
                }
                <div className={ classes.buttonRow }>
                    <Button fab color="primary" onClick={ this.addRepoField }>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(App);
