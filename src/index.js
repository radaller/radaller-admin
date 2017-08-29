import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './login/containers/Layout/Layout';
import Login from './login/containers/Login/Login';
import Repos from './login/containers/Repos/Repos';

ReactDOM.render(
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={ Repos } />
                <Route path="/login" component={ Login } />
            </Switch>
        </Layout>
    </BrowserRouter>,
    document.getElementById('root')
);
