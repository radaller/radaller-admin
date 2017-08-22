import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

const Field = ({ field }) => (
    <TextField
        name={ field.name }
        value={ field.value }
        error={ field.error }
        type={ field.type }
        label={ field.placeholder }
        fullWidth
        margin="normal"
        onChange={ (evt) => { field.setValue(evt.target.value) } }
        onBlur={ () => { field.validate() } }
    />
);


export default observer(Field);
