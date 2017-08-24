import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Field from '../Form/Field';
import FormStore from '../../stores/form/form';

const styles = {
    generateBtn: {
        fontSize: 10,
        minWidth: 40,
        padding: 10,
        marginBottom: 8,
        minHeight: 30,
    }
};

@observer
class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.onGeneratePress = this.onGeneratePress.bind(this);
        this.onNextPress = this.onNextPress.bind(this);
        this.form = new FormStore(props.fields);
    }

    onGeneratePress() {
        this.props.onTokenGeneratePress();
    }

    onNextPress() {
        this.form.validate();

        if (this.form.valid) {
            this.props.onSubmit(this.form.getFieldsData());
        }
    }

    render() {
        const cs = this.props.classes;
        const { fields } = this.form;

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={8}>
                        <Field field={ fields[0] } />
                    </Grid>
                </Grid>
                <Grid container spacing={24} align={'flex-end'}>
                    <Grid item xs={8} sm={8}>
                        <Field field={ fields[1] } />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button
                            raised
                            onClick={ this.onGeneratePress }
                            className={ cs.generateBtn }
                        >Generate</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={8}>
                        <Button
                            raised
                            color="primary"
                            onClick={ this.onNextPress }
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(LoginForm);
