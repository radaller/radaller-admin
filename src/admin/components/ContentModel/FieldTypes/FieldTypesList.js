import React from 'react';
import PropTypes from 'prop-types';

import FieldType from './FieldType';

const FieldTypesList = ({ fieldTypes, onFieldTypeChosen }) => {
    return (
        <div>
            {
                Object.keys(fieldTypes).map((key) => {
                    const field = fieldTypes[key];

                    return (
                        <FieldType
                            field={ field }
                            onClick={ () => {
                                onFieldTypeChosen(field.fieldType);
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