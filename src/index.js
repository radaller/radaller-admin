import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router } from 'react-router-dom';
import { reaction } from "mobx"

import OneColunmLayout from './repositories/layouts/OneColunmLayout';
import LoginContainer from './repositories/containers/LoginContainer';
import RepositoriesContainer from './repositories/containers/RepositoriesContainer';
import Store from './stores/Store';
import LocalStorageSession from './LocalStorageSession';
import createBrowserHistory from "history/createBrowserHistory";
require('../public/favicon.ico');

const history = createBrowserHistory();
const store = Store.create( {}, { session: new LocalStorageSession(), history: history });

const App = () => (
    <Router history={ history }>
        <OneColunmLayout store={store}>
            <Switch>
                <Route exact path="/" render={ props => <RepositoriesContainer store={store} {...props} />} />
                <Route path="/login" render={ props => <LoginContainer store={store} {...props} />} />
            </Switch>
        </OneColunmLayout>
    </Router>
);

ReactDOM.render(App(), document.getElementById('root'));