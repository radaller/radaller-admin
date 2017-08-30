import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';

class ContentModel extends Component {
    constructor() {
        super();
    }

    render() {
        return (

            <Card>
                <ViewTitle title="Content Model"/>

                Content Model page
            </Card>

        )
    }
}

export default ContentModel;