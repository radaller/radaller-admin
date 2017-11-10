const jsonServer = require('json-server');
const server = jsonServer.create();
const data = require('./data');
const router = jsonServer.router(data());
const middlewares = jsonServer.defaults();
const auth = require('./middlewares/auth');
const repositories = require('./middlewares/repositories');
const path = require('path');
const Base64 = require('js-base64').Base64;

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(auth);
server.use(repositories);

server.use(jsonServer.rewriter({
    "/user/repos*": "/repositories$1",
    "/repos/valid_username/existing-repository": "/repositories/1",
    "/repos/test/test-repository-1/contents/*": "/repository_with_content/contents/$1",
    "/repos/valid_username/new-repository/contents/*": "/empty_repository/contents/$1"
}));

server.use(function(req, res, next) {
    const matches = req.url.replace("?ref=master", "").match(/\/(.*)\/contents\/(.*)/);
    if (matches && matches.length > 1) {
        const id = matches[2].replace(/\//g, '_');
        const mockPath = `/${matches[1]}/`;
        req.url = mockPath;

        if (matches[2].indexOf('.yaml') > 0) {
            req.url += id;
        } else {
            req.query.dir = matches[2];
        }
        if (req.method === "PUT" || req.method === "POST") {
            if (!req.body.sha) {
                req.method = "POST";
                req.url = mockPath;
            }
            console.log(req.url);
            req.body = {
                id: id,
                content: Base64.decode(req.body.content),
                dir: path.dirname(matches[2]),
                name: path.basename(matches[2]),
                path: matches[1],
                type: 'file',
                encoding: "base64",
                sha: id
            };
        }
    }

    next();
});

server.use(router);
router.render = function (req, res) {
    let data = res.locals.data;
    if (req.method === "GET" && req.path === '/repositories') {
        data = {
            total_count: res.locals.data.length,
            incomplete_results: false,
            items: res.locals.data,
        };
        data = JSON.stringify(data);
    } else if (
        req.path.indexOf(".yaml") > 0 &&
        req.get('Accept') === 'application/vnd.github.v3.raw+json'
    ) {
        data = res.locals.data.content;
    }
    res.send(data);
};
server.listen(3000, () => {
    console.log('JSON Server is running')
});