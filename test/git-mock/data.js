
module.exports = () => {
    return {
        user: require('./data/user.json'),
        repositories: require('./data/repositories.json'),
        authorizations: require('./data/authorizations.json'),
        schemas: require('./data/schemas.json'),
        posts: require('./data/posts.json'),
        menus_items: require('./data/menus_items.json')
    }
};