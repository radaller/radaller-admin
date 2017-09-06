import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import getIcon from '../FieldTypes/getIcon';

export default ({ option, onDelete }) => {
    return (
        <Card>
            <CardHeader
                title={ option.title }
                subtitle={ option.subTitle }
            />
        </Card>
    )
}