import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const RepositoryList = ( { className, listHeader, items, onRepositoryClick } ) => {
    const renderListItem = item => {
        return [
            <ListItem
                className={ "list-item" }
                key={ item.id }
                value={ item.id }
                primaryText={ item.name }
                secondaryText={ item.full_name }
                secondaryTextLines={ 1 }
                leftAvatar={ <Avatar size={35}>{item.name.substring(0,1).toUpperCase()}</Avatar> }
                onClick={ () => onRepositoryClick(item.id) }
            />,
            <Divider key={ 'd:' + item.id } inset={ true }/>
        ];
    };

    return [
        <List className={className}>
            { listHeader && (<Subheader>{listHeader}</Subheader>) }
            { items.map(renderListItem) }
        </List>
    ];
};


export default RepositoryList;