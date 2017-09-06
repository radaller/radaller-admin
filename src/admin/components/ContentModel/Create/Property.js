import React from 'react';
import {ListItem} from 'material-ui/List';
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

export default ({ property, onDelete, onEdit }) => {
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
            primaryText={ property.name }
            secondaryText={ property.subTitle }
        />
    )
}