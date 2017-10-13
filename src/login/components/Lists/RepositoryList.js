import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const RepositoryList = ( { listHeader, items, onRepositoryClick } ) => {
    const renderListItem = items => {
        return [
            <ListItem key={ items.id }
                primaryText={ items.name }
                secondaryText={ items.full_name }
                secondaryTextLines={1}
                leftAvatar={ <Avatar size={35}>{items.name.substring(0,1).toUpperCase()}</Avatar> }
                onClick={ () => onRepositoryClick(items) }
            />,
            <Divider key={ 'd:' + items.id } inset={ true }/>
        ];
    };

    return [
        <List>
            { listHeader && (<Subheader>{listHeader}</Subheader>) }
            { items.map(renderListItem) }
        </List>
    ];
};


export default RepositoryList;