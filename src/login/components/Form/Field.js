import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

const Field = ({ field }) => (
    <TextField
        floatingLabelText={ field.placeholder }
        name={ field.name }
        value={ field.value }
        errorText={ field.error }
        type={ field.type }
        fullWidth
        onChange={ (evt) => { field.setValue(evt.target.value) } }
        onBlur={ () => { field.validate() } }
    />
);


export default observer(Field);
