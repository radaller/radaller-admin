import React from 'react';
import Paper from 'material-ui/Paper';

import getIcon from './getIcon';

const box = {
    display: 'inline-block',
    textAlign: 'center',
    width: 80,
    marginTop: 15,
};

const iconBox = {
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

export default ({ field, onClick }) => {
    return (
        <div style={ box }>
            <Paper
                style={ iconBox }
                onClick={ () => { onClick(field) } }
            >
                { getIcon(field.fieldType) }
            </Paper>
            <div style={ title }><strong>{ field.title }</strong></div>
            <p style={ desc }>{ field.shortDesc }</p>
        </div>
    )
}