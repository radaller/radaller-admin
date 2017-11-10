import { types, getEnv } from "mobx-state-tree";
import User from './User';
import Login from './Login';
import Repository from './Repository';
import SuggestedRepository from './Repository';
import { GitHubCms } from 'radaller-core';
import * as routes from './../constants/routes';

const Store = types
    .model({
        user: types.maybe(types.late(() => User)),
        login: types.maybe(types.late(() => Login)),
        route: types.optional(types.string, routes.HOME),
        suggestedRepositories: types.optional(types.map(SuggestedRepository), {}),
        isLoadingSuggestedRepositories: false,
        currentRepository: types.maybe(types.reference(types.late(() => Repository))),
        recentRepositories: types.optional(types.map(Repository), {}),
        snackbarMessage: types.optional(types.string, '')
    })
    .views(self => ({
        getSortedRecentRepositories() {
            return self.recentRepositories.values().sort((a,b) => a.openedAt < b.openedAt);
        }
    }))
    .actions(self => ({
        afterCreate() {
            const userSession = getEnv(self).session.getItem('auth');
            const repositories = getEnv(self).session.getItem('repos');
            if (repositories) {
                self.recentRepositories = repositories;
            }
            if (userSession) {
                self.initUser(userSession);
                self.open(routes.HOME);
            } else {
                self.login = Login.create();
                self.open(routes.LOGIN);
            }
        },
        showSnackbarMessage(message) {
            self.snackbarMessage = message;
        },
        clearSnackbarMessage() {
            self.snackbarMessage = '';
        },
        initUser(auth) {
            self.user = User.create(auth);
            self.api = GitHubCms.getApi(self.user.getAuth());
        },
        updateSessionAuth(auth) {
            getEnv(self).session.setItem('auth', auth);
        },
        open(page) {
            getEnv(self).history.push(page);
        },
        createRepository: async (repository) => {
            const data = {
                "name": repository.name,
                "description": "Radaller CMS Repository."
            };
            try {
                const response = await self.api.getUser().createRepo(data);
                return response.data;
            } catch (error) {
                console.log(error);
                let errorMessage = "Unknown error.";
                self.showSnackbarMessage(errorMessage);
            }
        },
        addSuggestedRepository(repository) {
            self.suggestedRepositories.set(repository.id, repository);
        },
        openRepository(repository) {
            self.addRepositoryToRecent(repository);
            self.setCurrentRepository(repository);
            window.location.href = routes.ADMIN;
        },
        setCurrentRepository(repository) {
            self.currentRepository = self.recentRepositories.get(repository.id);
            getEnv(self).session.setItem('current', self.currentRepository.full_name);
        },
        addRepositoryToRecent(repository) {
            if (!self.recentRepositories.get(repository.id)) {
                self.recentRepositories.set(repository.id, repository);
            }
            self.recentRepositories.get(repository.id).openedAt = Date.now();
            getEnv(self).session.setItem('repos', self.recentRepositories.toJSON());
        },
        fetchSuggestedRepositories: async () => {
            self.setIsLoadingSuggestedRepositories(true);
            try {
                const response = await self.api.getUser().listRepos();
                if (response.data && response.data.length > 0) {
                    response.data
                        .filter(item => item.permissions.pull === true)
                        .forEach(item => {
                            const repository = SuggestedRepository.create({
                                id: item.id,
                                name: item.name,
                                full_name: item.full_name,
                                description: item.description ? item.description : ""
                            });
                            self.addSuggestedRepository(repository);
                        });
                }
            } catch (error) {
                let errorMessage = "Unknown error.";
                self.showSnackbarMessage(errorMessage);
            }
            self.setIsLoadingSuggestedRepositories(false);
        },
        setIsLoadingSuggestedRepositories(isLoading) {
            self.isLoadingSuggestedRepositories = isLoading;
        }
    }));

export default Store;