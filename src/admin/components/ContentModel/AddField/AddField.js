import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextIcon from 'material-ui/svg-icons/editor/format-align-justify';

const typeBox = {
    display: 'inline-block',
    marginTop: 4,
    padding: 8,
    textAlign: 'center'
};

export default class AddField extends Component {
    constructor() {
        super();
        this.state = {
            fields: [
                {
                    type: 'TextInput',
                    label: 'Text',
                    value: 'some',
                    required: false,
                    icon: <TextIcon />
                }
            ],
            selectedField: {}
        };
        this.saveField = this.saveField.bind(this);
    };

    saveField(field) {
        this.props.onSave(field);
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
                                <Paper
                                    style={ typeBox }
                                    onClick={ () => { this.saveField(field) } }
                                >
                                    { field.icon }
                                    <div>{ field.label }</div>
                                </Paper>
                            )
                        })
                    }
                </div>
            </Dialog>
        )
    }
}