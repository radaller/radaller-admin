const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const data = require('./data');
const router = jsonServer.router(data());
const middlewares = jsonServer.defaults();
const auth = require('./middlewares/auth');

server.use(middlewares);
server.use(auth);
server.use(jsonServer.rewriter({
    "/user/repos\\?type=:type&sort=:sort&per_page=:per_page": "/repositories",
    "/repos/test/test-repository-1/contents/schemas?ref=master" : "/schemas",
    "/repos/test/test-repository-1/contents/posts?ref=master" : "/posts",
    "/repos/test/test-repository-1/contents/menus/items?ref=master" : "/menus_items",
    "/repos/test/test-repository-1/contents/*?ref=master" : "/$1"
}));
server.use(express.static(__dirname + '/../../node_modules/radaller-mock-data'));
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
});