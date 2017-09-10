import React from 'react';
import TextIcon from 'material-ui/svg-icons/content/text-format';
import DefaultIcon from 'material-ui/svg-icons/content/add';

const style = {
    fill: '#03A9F4',
};

export default (type) => {
    switch(type) {
        case 'text':
            return <TextIcon style={ style } />;

        default:
            return <DefaultIcon style={ style } />;
    }
}
