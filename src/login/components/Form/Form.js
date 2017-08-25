import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
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
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        {
                            fields.map((field, index) => <Field key={ index } field={ field } />)
                        }
                    </Col>
                </Row>
                <Row between="xs">
                    <Col>
                        <br/>
                        <RaisedButton
                            primary={true}
                            onClick={ this.props.onCancelPress }
                            label="Cancel"
                        />
                    </Col>
                    <Col>
                        <br/>
                        <RaisedButton
                            primary={true}
                            onClick={ this.onNextPress }
                            label="Next"
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default GenerateForm;
