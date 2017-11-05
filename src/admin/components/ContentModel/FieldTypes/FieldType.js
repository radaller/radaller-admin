import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import getIcon from '../../../utils/getIcon';

const iconBox = {
    verticalAlign: 'top',
    display: 'inline-block',
    marginTop: 4,
    padding: 8,
    height: 60,
    width: 60,
    cursor: 'pointer',
};

const title = {
    fontSize: 14,
    color: '#000',
    margin: '10px 0 8px 0',
};

const desc = {
    fontSize: 10,
    margin: 0,
    padding: 0,
};

const FieldType = ({ field, onClick }) => {
    return (
        <div className="fieldTypeBox">
            <Paper
                style={ iconBox }
                onClick={ () => { onClick(field) } }
            >
                { getIcon(field.inputType) }
            </Paper>
            <div style={ title }><strong>{ field.descTitle }</strong></div>
            <p style={ desc }>{ field.shortDesc }</p>
        </div>
    )
};

FieldType.propTypes = {
    field: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default FieldType;