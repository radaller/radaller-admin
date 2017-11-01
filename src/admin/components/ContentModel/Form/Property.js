import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import getIcon from '../../../utils/getIcon';

const box = {
    height: 'auto',
    margin: '0 10px 0 0',
    top: 5
};

const icon = {
    width: 20,
    height: 20,
};

const iconButton = {
    padding: 5,
    width: 30,
    height: 30,
};

const Property = ({ property, onDelete, onEdit }) => {
    return (
        <ListItem
            leftIcon={getIcon(property.fieldType)}
            rightIcon={
                <div style={ box }>
                    <IconButton
                        style={ iconButton }
                        iconStyle={ icon }
                        onClick={ () => {
                            onEdit(property)
                        } }
                    >
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                        style={ iconButton }
                        iconStyle={ icon }
                        onClick={ () => {
                            onDelete(property)
                        } }>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
            primaryText={ property.title }
            secondaryText={ property.subTitle }
        />
    )
};

Property.propTypes = {
    property: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Property;