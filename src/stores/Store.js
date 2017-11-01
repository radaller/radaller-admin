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
                self.user = User.create(userSession);
                getEnv(self).history.push(routes.HOME);
            } else {
                self.login = Login.create();
                getEnv(self).history.push(routes.LOGIN);
            }
        },
        showSnackbarMessage(message) {
            self.snackbarMessage = message;
        },
        clearSnackbarMessage() {
            self.snackbarMessage = '';
        },
        setUser(auth) {
            self.user = User.create(auth);
            getEnv(self).session.setItem('auth', auth);
            getEnv(self).history.push(routes.HOME);
        },
        addSuggestedRepository(repository) {
            self.suggestedRepositories.set(repository.id, repository);
        },
        openRepository(repositoryId) {
            if (!self.recentRepositories.get(repositoryId)) {
                const suggestedRepository = self.suggestedRepositories.get(repositoryId);
                self.recentRepositories.set(suggestedRepository.id, suggestedRepository.toJSON());
            }
            self.currentRepository = self.recentRepositories.get(repositoryId);
            self.currentRepository.openedAt = Date.now();

            getEnv(self).session.setItem('repos', self.recentRepositories.toJSON());
            getEnv(self).session.setItem('current', self.currentRepository.full_name);
            window.location.href = routes.ADMIN;
        },
        fetchSuggestedRepositories: async () => {
            self.setIsLoadingSuggestedRepositories(true);
            try {
                const gitHubAPI = GitHubCms.getApi(self.user.getAuth());
                const response = await gitHubAPI.getUser().listRepos();
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