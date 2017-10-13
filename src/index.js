import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import OneColunmLayout from './login/layouts/OneColunmLayout';
import LoginContainer from './login/containers/LoginContainer';
import RepositoriesContainer from './login/containers/RepositoriesContainer';
import Store from './stores/Store';
import LocalStorageSession from './LocalStorageSession';

const store = Store.create({}, { session: new LocalStorageSession() });

const App = () => (
    <HashRouter>
        <OneColunmLayout>
            <Switch>
                <Route exact path="/" render={ props => <RepositoriesContainer store={store} {...props} />} />
                <Route path="/login" render={ props => <LoginContainer store={store} {...props} />} />
            </Switch>
        </OneColunmLayout>
    </HashRouter>
);

ReactDOM.render(App(), document.getElementById('root'));