import { types, getParent } from "mobx-state-tree";
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
        authenticate: async (credentials) => {
            const store = getParent(self);
            try {
                const auth = await getGitHubAuth(self.type, credentials);
                store.setUser(auth);
            } catch (error) {
                console.log(error);
                if (error instanceof GitHubTwoFactorError) {
                    throw error;
                } else if (error instanceof GitHubUnauthorisedError) {
                    let errorMessage = typeof credentials === "string" ? "Token is not valid." : "Credentials are not valid.";
                    store.showSnackbarMessage(errorMessage);
                    return Promise.resolve();
                } else {
                    let errorMessage = "Unknown error.";
                    store.showSnackbarMessage(errorMessage);
                    throw error;
                }
            }
        },
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