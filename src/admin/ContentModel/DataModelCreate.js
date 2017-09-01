import React from 'react';
import {
    Create,
} from 'admin-on-rest';

import CreateForm from './components/CreateForm';

export default (props) => {
    return (
        <Create title="Create Data Model" {...props}>
            <CreateForm />
        </Create>
    )
};