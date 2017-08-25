import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Paper from 'material-ui/Paper';

import LoginForm from '../../components/LoginForm/Form';
import FieldStore from '../../stores/form/field';

import Form from '../../components/Form/Form';

const stylesPaper = {
    padding: 15,
    paddingTop: 0,
    margin: 5,
};

@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                userName: new FieldStore({ name: 'user_name', value: '', placeholder: 'Enter git user name' }),
                token: { name: 'token', value: '', placeholder: 'Enter git token' },
                password: new FieldStore({ name: 'password', value: '', placeholder: 'password', type: 'password' }),
                code: { name: 'code', value: '', placeholder: 'Enter received code' },
            },
            showLoginForm: true,
            showGenerateForm: false,
            showCodeForm: false,
        };

        this.showForm = this.showForm.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onTokenGenSubmit = this.onTokenGenSubmit.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }

    showForm(form) {
        this.setState({
            showLoginForm: form === 'login',
            showCodeForm: form === 'code',
            showGenerateForm: form === 'generate',
        });
    }

    onLoginSubmit(data) {
        this.props.onLogedIn();
    }

    onTokenGenSubmit(data) {
        this.showForm('code');
    }

    onCodeSubmit(data) {

    }

    render() {
        return (
            <div style={ stylesPaper } elevation={ 4 }>
                {
                    this.state.showLoginForm && (
                        <LoginForm
                            fields={ [this.state.fields.userName, this.state.fields.token] }
                            onSubmit={ this.onLoginSubmit }
                            onTokenGeneratePress={ () => {
                                this.showForm('generate')
                            } }
                        />
                    )
                }

                {
                    this.state.showGenerateForm && (
                        <Form
                            fields={ [this.state.fields.userName, this.state.fields.password] }
                            onSubmit={ this.onTokenGenSubmit }
                            onCancelPress={ () => {
                                this.showForm('login')
                            } }
                        />
                    )
                }

                {
                    this.state.showCodeForm && (
                        <Form
                            fields={ [this.state.fields.code] }
                            onSubmit={ this.onCodeSubmit }
                            onCancelPress={ () => {
                                this.showForm('login')
                            } }
                        />
                    )
                }
            </div>
        );
    }
}

export default App;
