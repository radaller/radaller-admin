import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import GithubBoxIcon from 'mdi-react/GithubBoxIcon';
import FolderOpenIcon from 'mdi-react/FolderOpenIcon';
import DatabasePlusIcon from 'mdi-react/DatabasePlusIcon';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RepositoryList from '../components/Lists/RepositoryList';
import FilteredRepositoryList from '../components/Lists/FilteredRepositoryList';
import FetchContentPopup from '../components/Popups/FetchContentPopup';

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
        this.props.store.openRepository(repository.toJSON());
        this.goToAdmin()
    }

    goToAdmin() {
        window.location.href = routes.ADMIN;
    }

    goToLogin() {
        this.props.history.push(routes.LOGIN);
    }

    handleOpen = () => {
        this.props.store.fetchSuggestedRepositories();
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getGitHubLink() {
        return [
            this.props.store.user && <FlatButton
                href={`https://github.com/${this.props.store.user.username}?tab=repositories`}
                target="_blank"
                label="Repositories"
                labelStyle={ {textTransform: "none"} }
                icon={ <GithubBoxIcon/> }
            />
        ];
    }

    render() {
        return (
            <Paper zDepth={2}>
                <Grid fluid>
                    <Row style={{height: "400px"}}>
                        {
                            this.props.store.getSortedRecentRepositories().length > 0 && (
                                <Col xs={8} style={{overflowX: "auto", borderRight: '1px solid rgb(217, 217, 217)'}}>
                                    <RepositoryList
                                        listHeader={ "Recent Repositories" }
                                        items={ this.props.store.getSortedRecentRepositories() }
                                        onRepositoryClick={ repository => this.openRepository(repository) }
                                    />
                                </Col>
                            )
                        }
                        <Col xs={4} xsOffset={this.props.store.getSortedRecentRepositories().length ? 0 : 4}>
                            <Row center="xs" >
                                <br/><br/><br/>
                                <img src="../../../public/logo.png"/>
                                <br/>
                            </Row>
                            <Row center="xs" >
                                <Col xs={8}>
                                    <Row left="xs">
                                        <Menu style={{width: "100px"}}>
                                            <MenuItem
                                                primaryText="Open"
                                                leftIcon={ <FolderOpenIcon /> }
                                                onClick={ this.handleOpen } />
                                            <MenuItem
                                                primaryText="New"
                                                leftIcon={ <DatabasePlusIcon/> }/>
                                        </Menu>
                                        <FetchContentPopup
                                            header={ this.getGitHubLink() }
                                            isLoading={ this.props.store.isLoadingSuggestedRepositories }
                                            open={ this.state.open }
                                            onRequestClose={ this.handleClose }
                                        >
                                            <FilteredRepositoryList
                                                items={ this.props.store.suggestedRepositories }
                                                onRepositoryClick={ repository => this.openRepository(repository) }
                                            />
                                        </FetchContentPopup>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Paper>
        );
    }
}

export default RepositoriesContainer;
