const CURRENT_REPOSITORY_KEY = 'current';
const REPOSITORY_LIST_KEY = 'repos';
const AUTH_KEY = 'auth';

class Session {
    setItem(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    removeItem(key) {
        localStorage.removeItem(key);
    }
    isRepositorySelected() {
        return !!this.getItem(CURRENT_REPOSITORY_KEY);
    }

    getCurrentRepository() {
        return this.getItem(CURRENT_REPOSITORY_KEY);
    }

    setCurrentRepository(current) {
        this.setItem(CURRENT_REPOSITORY_KEY, current);
    }

    clearSelectedRepository() {
        this.removeItem(CURRENT_REPOSITORY_KEY);
    }

    getRepositories() {
        return this.getItem(REPOSITORY_LIST_KEY);
    }

    setRepositories(repositories) {
        this.setItem(REPOSITORY_LIST_KEY, repositories);
    }

    getAuth() {
        return this.getItem(AUTH_KEY);
    }

    setAuth(auth) {
        this.setItem(AUTH_KEY, auth);
    }

    isAuthorised() {
        return !!this.getItem(AUTH_KEY);
    }
}

export default Session;