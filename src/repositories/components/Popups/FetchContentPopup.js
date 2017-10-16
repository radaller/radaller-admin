import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';

const FetchContentPopup = (props) => {
    const getActions = () => {
        return [
            <FlatButton
                label="Close"
                primary={ true }
                onClick={ props.onRequestClose }
            />
        ];
    };

    return (
        <Dialog
            {...props}
            actions={ getActions() }
            modal={ false }
            autoScrollBodyContent={ true }
        >
            {props.header}
            <Divider/>
            { !props.isLoading ? props.children: <LinearProgress mode="indeterminate" /> }
        </Dialog>
    );
};

export default FetchContentPopup;