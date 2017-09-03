const user = require('./data/user.json');
const repositories = require('./data/repositories.json');

module.exports = () => {
    return {
        user: user,
        repositories: repositories
    }
};