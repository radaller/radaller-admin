import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Field from '../Form/Field';
import FormStore from '../../stores/form/form';

const generateBtn = {
    fontSize: 12,
    height: 30,
    lineHeight: '30px',
    marginBottom: 15,
    maxWidth: 75
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
        const { fields } = this.form;
        return (
            <Grid fluid>
                <Row bottom="xs">
                    <Col xs={8} sm={8}>
                        <Field field={ fields[0] }/>
                    </Col>
                    <Col xs={4} sm={4}>
                        <RaisedButton
                            style={ generateBtn }
                            className="generate-button"
                            onClick={ this.onGeneratePress }
                        >Generate</RaisedButton>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <br/>
                        <RaisedButton
                            primary={true}
                            onClick={ this.onNextPress }
                            fullWidth
                            label="Next"
                            className="next-button"
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default LoginForm;
