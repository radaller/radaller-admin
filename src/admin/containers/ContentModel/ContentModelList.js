import React from 'react';
import {
    List,
    EditButton,
    DeleteButton,
    Datagrid,
    TextField,
} from 'admin-on-rest';

export default (props) => {
    return (
        <List title="Data Models" {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title"  />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};