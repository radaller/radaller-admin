import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import getIcon from '../../../utils/getIcon';

export default ({ property, onDelete }) => {
    return (
        <Card>
            <CardHeader
                avatar={ getIcon(property.fieldType) }
                title={ property.name }
                subtitle={ property.subTitle }
            />
        </Card>
    )
}