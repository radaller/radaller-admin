import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';

import FieldType from './FieldTypes/FieldType';
import FieldTypeForm from './FieldTypes/FieldTypeForm';

import fieldsData from './FieldTypes/fields.json';

export default class AddField extends Component {
    constructor() {
        super();
        this.state = {
            fields: fieldsData,
            selectedFieldIndex: null
        };
        this.saveField = this.saveField.bind(this);
        this.onClose = this.onClose.bind(this);
        this.resetState = this.resetState.bind(this);
    };

    saveField(data) {
        this.resetState();
        this.props.onSave(data);
    }

    chooseFieldType(index) {
        this.setState({ selectedFieldIndex: index });
    }

    resetState() {
        this.setState({ fields: fieldsData, selectedFieldIndex: null });
    }

    onClose() {
        this.resetState();
        this.props.onClose();
    }

    render() {
        const { fields, selectedFieldIndex } = this.state;
        const showForm = selectedFieldIndex !== null;

        return (
            <Dialog
                title="Add new Field"
                titleStyle={ { background: '#ececec' } }
                // actions={dialogActions}
                modal={false}
                open={this.props.show}
                onRequestClose={this.props.onClose}
            >
                <IconButton
                    onClick={this.onClose}
                    style={ { position: 'absolute', right: 0, top: 10 } }
                >
                    <IconClose />
                </IconButton>
                <div>
                     {
                         !showForm && fields.map((field, index) => {
                            return (
                                <FieldType
                                    field={ field }
                                    onClick={ () => { this.chooseFieldType(index) } }
                                />
                            )
                        })
                    }
                </div>

                {
                    showForm && (
                        <FieldTypeForm
                            field={ fields[selectedFieldIndex] }
                            onBack={ this.resetState }
                            onSave={ this.saveField }
                        />
                    )
                }

            </Dialog>
        )
    }
}