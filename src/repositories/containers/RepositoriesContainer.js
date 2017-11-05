import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import OneColumnLayout from '../layouts/OneColumnLayout';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import GithubBoxIcon from 'mdi-react/GithubBoxIcon';
import FolderOpenIcon from 'mdi-react/FolderOpenIcon';
import DatabasePlusIcon from 'mdi-react/DatabasePlusIcon';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RepositoryList from '../components/Lists/RepositoryList';
import FilteredRepositoryList from '../components/Lists/FilteredRepositoryList';
import FetchContentPopup from '../components/Popups/FetchContentPopup';
import * as routes from './../../constants/routes';

import logo from '../../../public/logo.png';

@inject("store") @observer
class RepositoriesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    openRepository = (repositoryId) => {
        this.props.store.openRepository(repositoryId);
    };

    handleOpen = () => {
        this.props.store.fetchSuggestedRepositories();
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    openNewRepositoryPage = () => {
        this.props.store.open(routes.NEW);
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
            <OneColumnLayout {...this.props}>
                {
                    this.props.store.getSortedRecentRepositories().length > 0 && (
                        <Col xs={8} style={{overflowX: "auto", borderRight: '1px solid rgb(217, 217, 217)'}}>
                            <RepositoryList
                                className="repository-list"
                                listHeader={ "Recent Repositories" }
                                items={ this.props.store.getSortedRecentRepositories() }
                                onRepositoryClick={ this.openRepository }
                            />
                        </Col>
                    )
                }
                <Col xs={4} xsOffset={this.props.store.getSortedRecentRepositories().length ? 0 : 4}>
                    <Row center="xs" >
                        <img style={{paddingTop:"60px",paddingBottom:"30px"}} src={ logo }/>
                    </Row>
                    <Row center="xs" >
                        <Col xs={8}>
                            <Row left="xs">
                                <Menu style={{width: "100px"}}>
                                    <MenuItem
                                        className="repository-open"
                                        primaryText="Open"
                                        leftIcon={ <FolderOpenIcon /> }
                                        onClick={ this.handleOpen } />
                                    <MenuItem
                                        primaryText="New"
                                        leftIcon={ <DatabasePlusIcon/> }
                                        onClick={ this.openNewRepositoryPage }
                                    />
                                </Menu>
                                <FetchContentPopup
                                    header={ this.getGitHubLink() }
                                    isLoading={ this.props.store.isLoadingSuggestedRepositories }
                                    open={ this.state.open }
                                    onRequestClose={ this.handleClose }
                                >
                                    <FilteredRepositoryList
                                        className="suggested-repositories"
                                        items={ this.props.store.suggestedRepositories.values() }
                                        onRepositoryClick={ this.openRepository }
                                    />
                                </FetchContentPopup>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </OneColumnLayout>
        );
    }
}

export default RepositoriesContainer;
