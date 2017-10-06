import { GitHubCms } from 'radaller-core';
import Session from '../Session';

export default (url, options) => {
    const session = new Session(localStorage);
    const auth = session.getAuth();
    const repo = session.getCurrentRepository();

    const config = {
        auth: auth,
        repository: repo
    };

    if (process.env.GIT_API_URL) {
        config.apiBase = process.env.GIT_API_URL
    }

    const restStorage = GitHubCms.getRestStorage(config);


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
            return restStorage.put(path, options.body).then(data => ({json: JSON.parse(data)}));
            break;
        case 'POST':
            return restStorage.post(path, options.body).then(data => ({json: JSON.parse(data)}));
            break;
        case 'DELETE':
            return restStorage.remove(path).then(data => ({json: JSON.parse(data)}));
            break;
        default:
            return restStorage.get(path, query).then(data => ({json: JSON.parse(data)}));
    }

}