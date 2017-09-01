import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default ({ onClick }) => (
    <RaisedButton
        label="Add field"
        icon={ <ContentAdd /> }
        primary={true}
        onClick={ onClick }
    />
);