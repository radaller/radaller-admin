import React from 'react';
import { observer } from 'mobx-react';
import AutoComplete from 'material-ui/AutoComplete';

const AutoCompleteField = ({ field, onNewRequest, dataSource, onUpdateInput }) => (
    <AutoComplete
        dataSource={dataSource}
        onUpdateInput={(value) => {field.setValue(value);onUpdateInput(value)}}
        floatingLabelText={ field.placeholder }
        name={ field.name }
        value={ field.value }
        errorText={ field.error }
        type={ field.type }
        fullWidth
        onNewRequest={ onNewRequest }
        onBlur={ () => { field.validate() } }
    />
);


export default observer(AutoCompleteField);