import React from 'react';
import PropTypes from 'prop-types';

import FieldType from './FieldType';

const FieldTypesList = ({ fieldTypes, onFieldTypeChosen }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            {
                Object.keys(fieldTypes).map((key) => {
                    const field = fieldTypes[key];

                    return (
                        <FieldType
                            field={ field }
                            onClick={ () => {
                                onFieldTypeChosen(field.inputType);
                            } }
                        />
                    )
                })
            }
        </div>
    )
};

FieldTypesList.propTypes = {
    fieldTypes: PropTypes.object.isRequired,
    onFieldTypeChosen: PropTypes.func.isRequired,
};

export default FieldTypesList;