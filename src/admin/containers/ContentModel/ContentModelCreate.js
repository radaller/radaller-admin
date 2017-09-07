import React from 'react';
import { Create } from 'admin-on-rest';

import Form from '../../components/ContentModel/Form';

export default (props) => {
    return (
        <Create title="Create Data Model" {...props}>
            <Form />
        </Create>
    )
};