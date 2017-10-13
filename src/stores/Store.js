import { types, getEnv, process } from "mobx-state-tree";
import User from './User';
import Login from './Login';
import Repository from './Repository';
import SuggestedRepository from './Repository';
import { GitHubCms } from 'radaller-core';

const Store = types
    .model({
        user: types.maybe(types.late(() => User)),
        login: types.maybe(types.late(() => Login)),
        suggestedRepositories: types.optional(types.array(SuggestedRepository), []),
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
            } else {
                self.login = Login.create();
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
        },
        openRepository(repository) {
            if (!self.recentRepositories.get(repository.id)) {
                self.recentRepositories.set(repository.id, Repository.create(repository));
            }
            const currentRepository = self.recentRepositories.get(repository.id);
            currentRepository.openedAt = Date.now();

            getEnv(self).session.setItem('repos', self.recentRepositories.toJSON());
            self.currentRepository = currentRepository;
            getEnv(self).session.setItem('current', self.currentRepository.full_name);
        },
        fetchSuggestedRepositories: process(
            function* fetchSuggestedRepositories() {
                self.isLoadingSuggestedRepositories = true;
                const gitHubAPI = GitHubCms.getApi(self.user.getAuth());
                try {
                    self.suggestedRepositories = yield gitHubAPI
                        .getUser()
                        .listRepos()
                        .then(response => {
                            if (response.data && response.data.length > 0) {
                                return response.data
                                    .filter(item => item.permissions.pull === true)
                                    .map(item => SuggestedRepository.create({
                                        id: item.id,
                                        name: item.name,
                                        full_name: item.full_name,
                                        description: item.description ? item.description : ""
                                    }))
                            }
                            return [];
                        });
                } catch (error) {
                    console.log(error);
                    let errorMessage = "Unknown error.";
                    self.showSnackbarMessage(errorMessage);
                }
                self.isLoadingSuggestedRepositories = false;
            }
        )
    }));

export default Store;