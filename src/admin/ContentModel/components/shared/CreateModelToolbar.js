import React from 'react';
import { SaveButton, Toolbar } from 'admin-on-rest';
import AddFieldButton from './AddFieldButton';

export default (props) => (
    <Toolbar {...props} >
        <AddFieldButton onClick={ props.showFieldsList } />
        <SaveButton redirect="list" submitOnEnter={false} />
    </Toolbar>
);