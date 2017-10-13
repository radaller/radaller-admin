import { types, process, getParent } from "mobx-state-tree";
import { useStrict } from 'mobx'; useStrict(false);
import { GitHubCms, GitHubTwoFactorError, GitHubUnauthorisedError } from 'radaller-core';

const Login = types
    .model({
        type: types.optional(types.string, "token")
    })
    .views(self => ({
        isBaseType() {
            return self.type === "base";
        },
        isTokenType() {
            return self.type === "token";
        }
    }))
    .actions(self => ({
        authenticate: process(
            function* authenticate(credentials) {
                const store = getParent(self);
                try {
                    const auth = yield getGitHubAuth(self.type, credentials);
                    store.setUser(auth);
                } catch (error) {
                    if (error instanceof GitHubTwoFactorError) {
                        yield Promise.reject(error);
                    } else if (error instanceof GitHubUnauthorisedError) {
                        let errorMessage = typeof credentials === "string" ? "Token is not valid." : "Credentials are not valid.";
                        store.showSnackbarMessage(errorMessage);
                    } else {
                        let errorMessage = "Unknown error.";
                        store.showSnackbarMessage(errorMessage);
                    }
                }
            }
        ),
        useBaseType() {
            self.type = "base";
        },
        useTokenType() {
            self.type = "token";
        }
    }));

function getGitHubAuth(type, credentials) {
    const gitHubAuth = GitHubCms.getAuth();
    if (type === "token") {
        return gitHubAuth.getAuthByToken(credentials);
    } else {
        credentials.appName = "Radaller CMS";
        return gitHubAuth.getAuthByBaseAuth(credentials);
    }
}

export default Login;