const CURRENT_REPOSITORY_KEY = 'current';
const REPOSITORY_LIST_KEY = 'repos';
const AUTH_KEY = 'auth';

class Session {
    constructor(sessionStorage) {
        this.sessionStorage = sessionStorage;
    }

    isRepositorySelected() {
        return !!this.sessionStorage.getItem(CURRENT_REPOSITORY_KEY);
    }

    getCurrentRepository() {
        return this.sessionStorage.getItem(CURRENT_REPOSITORY_KEY);
    }

    setCurrentRepository(current) {
        this.sessionStorage.setItem(CURRENT_REPOSITORY_KEY, current);
    }

    clearSelectedRepository() {
        this.sessionStorage.removeItem(CURRENT_REPOSITORY_KEY);
    }

    getRepositories() {
        return JSON.parse(this.sessionStorage.getItem(REPOSITORY_LIST_KEY));
    }

    setRepositories(repositories) {
        this.sessionStorage.setItem(REPOSITORY_LIST_KEY, JSON.stringify(repositories));
    }

    getAuth() {
        return JSON.parse(this.sessionStorage.getItem(AUTH_KEY));
    }

    setAuth(auth) {
        this.sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    }

    isAuthorised() {
        return !!this.sessionStorage.getItem(AUTH_KEY);
    }
}

export default Session;