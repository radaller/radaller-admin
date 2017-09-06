import React from 'react';
import TextIcon from 'material-ui/svg-icons/editor/format-align-justify';

const style = {
    fill: '#03A9F4',
};

export default (type) => {
    switch(type) {
        case 'TextInput':
            return <TextIcon style={ style } />;
    }
}
