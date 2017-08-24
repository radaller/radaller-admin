import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormStore from '../../stores/form/form';
import Field from './Field';

@observer
class GenerateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onNextPress = this.onNextPress.bind(this);
        this.form = new FormStore(props.fields);
    }

    onNextPress() {
        this.form.validate();

        if (this.form.valid) {
            this.props.onSubmit(this.form.getFieldsData());
        }
    }

    render() {
        const { fields } = this.form;
        
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={8}>
                        {
                            fields.map((field, index) => <Field key={ index } field={ field } />)
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={6} sm={4}>
                        <Button
                            raised
                            color="primary"
                            onClick={ this.props.onCancelPress }
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
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

export default GenerateForm;
