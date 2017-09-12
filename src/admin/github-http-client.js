import { GitHubCms } from 'radaller-core/github'

export default (url, options) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const repo = localStorage.getItem('current');

    const config = {
        username: auth.username,
        token: auth.token,
        repository: repo
    };

    if (process.env.GIT_API_URL) {
        config.apiBase = process.env.GIT_API_URL
    }

    const cms = new GitHubCms(config);


    const [pathname, search] = decodeURIComponent(url).split("?");

    const path = pathname.substr(1);
    let query = {};
    if (search) {
        query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    }

    if (query.filter) {
        query.filter = JSON.parse(query.filter);
    }

    switch (options.method) {
        case 'PUT':
            return cms.put(path, options.body).then(data => ({json: JSON.parse(data)}));
            break;
        case 'POST':
            return cms.post(path, options.body).then(data => ({json: JSON.parse(data)}));
            break;
        case 'DELETE':
            return cms.remove(path).then(data => ({json: JSON.parse(data)}));
            break;
        default:
            return cms.get(path, query).then(data => ({json: JSON.parse(data)}));
    }

}