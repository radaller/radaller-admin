import GithubCms from 'radaller-core/github-cms'

const cms = new GithubCms({
    username: 'osvarychevskyi',
    token: '',
    owner: 'radaller',
    repository: 'radaller-mock-data'
});

export default (url, options) => {
    const urlParts = new URL(decodeURIComponent(url));

    const path = urlParts.pathname.substr(1);
    let query = {};
    if (urlParts.search) {
        const search = urlParts.search.substr(1);
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
            return cms.get(path, query)
                .then(data => ({json: JSON.parse(data)}));
    }

}