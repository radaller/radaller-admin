import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';

import FieldTypeForm from './FieldTypes/FieldTypeForm';
import FieldTypesList from './FieldTypes/FieldTypesList';

class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editField: null,
            existedFieldIds: [],
        };

        this.onClose = this.onClose.bind(this);
        this.resetState = this.resetState.bind(this);
        this.saveField = this.saveField.bind(this);
        this.onFieldTypeChosen = this.onFieldTypeChosen.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        let ids = nextProps.existedFieldIds;
        if (nextProps.open) {
            // if edit field then remove its id from list to skip ids validation in form
            nextProps.editField && (ids = ids.filter(id => id !== nextProps.editField.id));

            this.setState({
                editField: nextProps.editField,
                existedFieldIds: ids,
            });
        }
    }

    onClose() {
        this.props.onClose();
    }

    onFieldTypeChosen(fieldTypeKey) {
        const { fieldTypesData } = this.props;
        this.setState({ editField: Object.assign({}, fieldTypesData[fieldTypeKey]) }) // prevent mutation
    }

    saveField(field) {
        this.resetState();
        this.props.onFieldTypeSave(field);
    }

    resetState() {
        this.setState({ editField: null, existedFieldIds: [] });
    }

    render() {
        const { title, open, fieldTypesData } = this.props;
        const { editField, existedFieldIds } = this.state;
        const showList = !editField;

        return (
            <Dialog
                title={ title }
                titleStyle={ { background: '#ececec' } }
                autoScrollBodyContent={ true }
                open={ open }
                onRequestClose={ this.onClose }
            >
                <IconButton
                    onClick={ this.onClose }
                    style={ { position: 'absolute', right: 0, top: 10 } }
                >
                    <IconClose />
                </IconButton>

                {
                    showList && <FieldTypesList fieldTypes={ fieldTypesData } onFieldTypeChosen={ this.onFieldTypeChosen } />
                }

                {
                    !showList && (
                        <FieldTypeForm
                            field={ editField }
                            existedFieldIds={ existedFieldIds }
                            onBackPress={ this.resetState }
                            onSavePress={ this.saveField }
                        />
                    )
                }
            </Dialog>
        )
    }
}

Popup.propTypes = {
    title: PropTypes.string.isRequired,
    fieldTypesData: PropTypes.object.isRequired,
    existedFieldIds: PropTypes.array.isRequired,
    editField: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    open:  PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onFieldTypeSave: PropTypes.func.isRequired,
};

export default Popup
