import React from 'react';
import { SaveButton, Toolbar } from 'admin-on-rest';
import AddButton from './AddButton';

export default (props) => (
    <Toolbar {...props} >
        <AddButton onClick={ props.showFieldsList } />
        <SaveButton redirect="list" submitOnEnter={false} />
    </Toolbar>
);