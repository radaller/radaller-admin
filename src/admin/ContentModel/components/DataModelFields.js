import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextIcon from 'material-ui/svg-icons/editor/format-align-justify';

const typeBox = {
    display: 'inline-block',
    padding: 4
};

export default class DataModelFields extends Component {
    constructor() {
        super();
        this.state = {
            fields: [
                {
                    type: 'TextInput',
                    label: 'Text',
                    value: '',
                    required: false,
                    icon: <TextIcon />
                }
            ],
        };
        this.saveField = this.saveField.bind(this);
    };

    saveField() {
        this.props.onSave();
    }


    render() {
        const { fields } = this.state;

        const dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onClose}
            />,
            <FlatButton
                label="Save Field"
                primary={true}
                onClick={this.saveField}
            />,
        ];

        return (
            <Dialog
                title="Add new Field"
                actions={dialogActions}
                modal={false}
                open={this.props.show}
                onRequestClose={this.props.onClose}
            >
                <div>
                    {
                        fields.map((field) => {
                            return (
                                <Paper style={ typeBox }>
                                    { field.icon }

                                </Paper>
                            )
                        })
                    }
                </div>
            </Dialog>
        )
    }
}