import React from 'react';
import { Edit } from 'admin-on-rest';

import Form from '../../components/ContentModel/Form';

export default (props) => {
    return (
        <Edit title="Create Data Model" {...props}>
            <Form />
        </Edit>
    )
};