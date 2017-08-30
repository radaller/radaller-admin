import React from 'react';
import { Route } from 'react-router-dom';
import { CONTENT_MODEL } from '../constants/routes';
import ContentModel from '../containers/ContentModel/ContentModel';

export default [
    <Route exact path={ CONTENT_MODEL } component={ ContentModel } />,
];