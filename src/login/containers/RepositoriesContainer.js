import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import GithubBoxIcon from 'mdi-react/GithubBoxIcon';
import FolderOpenIcon from 'mdi-react/FolderOpenIcon';
import DatabasePlusIcon from 'mdi-react/DatabasePlusIcon';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';

import * as routes from '../../constants/routes';

@inject("store") @observer
class RepositoriesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }
    componentDidMount() {
        if (!this.props.store.user) {
            this.goToLogin();
        }
    }

    openRepository(repository) {
        this.props.store.openRepository(repository);
        this.goToAdmin()
    }

    goToAdmin() {
        window.location.href = routes.ADMIN;
    }

    goToLogin() {
        this.props.history.push(routes.LOGIN);
    }

    getActions() {
        return [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];
    }

    handleOpen = () => {
        this.props.store.fetchSuggestedRepositories();
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <Paper zDepth={2}>
                <Grid fluid>
                    <Row style={{height: "400px"}}>
                        {
                            this.props.store.getSortedRecentRepositories().length && (
                                <Col xs={8} style={{overflowX: "auto", borderRight: '1px solid rgb(217, 217, 217)'}}>
                                    <List>
                                        <Subheader>Recent Repositories</Subheader>
                                        { this.getRepositoriesListItems() }
                                    </List>
                                </Col>
                            )
                        }
                        <Col xs={4} xsOffset={this.props.store.getSortedRecentRepositories().length ? 0 : 4}>
                            <Row middle="xs" left="xs" style={{height: "400px"}}>
                                <Menu>
                                    <MenuItem primaryText="Open" leftIcon={<FolderOpenIcon />} onClick={ this.handleOpen } />
                                    {/*<MenuItem primaryText="New" leftIcon={<DatabasePlusIcon/>}/>*/}
                                </Menu>
                                <Dialog
                                    actions={ this.getActions() }
                                    modal={ false }
                                    open={ this.state.open }
                                    onRequestClose={ this.handleClose }
                                    autoScrollBodyContent={ true }
                                >
                                    { this.props.store.user && [
                                        <FlatButton
                                            href={`https://github.com/${this.props.store.user.username}?tab=repositories`}
                                            target="_blank"
                                            label="Repositories"
                                            labelStyle={{textTransform: "none"}}
                                            icon={<GithubBoxIcon/>}
                                        />,
                                        <Divider/>,
                                        !this.props.store.isLoadingSuggestedRepositories && this.getSuggestedRepositoriesList(),
                                        this.props.store.isLoadingSuggestedRepositories && <LinearProgress mode="indeterminate" />
                                    ]}
                                </Dialog>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Paper>
        );
    }

    getRepositoriesListItems() {
        return this.props.store.getSortedRecentRepositories().map(repository =>
            [
                <ListItem
                    primaryText={ repository.name }
                    secondaryText={ repository.full_name }
                    secondaryTextLines={1}
                    leftAvatar={ <Avatar size={35}>{repository.name.substring(0,1).toUpperCase()}</Avatar> }
                />,
                <Divider inset={ true }/>
            ]
        )
    }

    getSuggestedRepositoriesList() {
        return [
            this.props.store.suggestedRepositories.length && <TextField
                hintText="Repository Name"
                floatingLabelText="Filter Results"
            />,
            this.props.store.suggestedRepositories &&
            <List>
                { this.props.store.suggestedRepositories.map(repository =>
                    [
                        <ListItem
                            primaryText={ repository.name }
                            secondaryText={ repository.full_name }
                            secondaryTextLines={1}
                            leftAvatar={ <Avatar size={35}>{repository.name.substring(0,1).toUpperCase()}</Avatar> }
                            onClick={ () => this.openRepository(repository.toJSON()) }
                        />,
                        <Divider inset={ true }/>
                    ])}
            </List>
        ];
    }
}

export default RepositoriesContainer;
