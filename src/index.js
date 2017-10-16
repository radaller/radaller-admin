import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import OneColunmLayout from './repositories/layouts/OneColunmLayout';
import LoginContainer from './repositories/containers/LoginContainer';
import RepositoriesContainer from './repositories/containers/RepositoriesContainer';
import Store from './stores/Store';
import LocalStorageSession from './LocalStorageSession';
require('../public/favicon.ico');

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