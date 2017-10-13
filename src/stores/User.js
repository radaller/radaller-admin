import { types } from "mobx-state-tree";


const Suggestion = types.model({
    id: types.number,
    full_name: types.string
});

const User = types
    .model({
        token: types.string,
        username: types.string,
        recentRepositories: types.optional(types.array(Suggestion), [])
    })
    .views(self => ({
        isAuthenticated() {
            return !!self.token;
        },
        getAuth() {
            return {token: self.token, username: self.username};
        }
    }))
    .actions(self => ({

    }));

export default User;