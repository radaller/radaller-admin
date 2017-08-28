const path = require('path');

const PATHS = {
    root: process.env.PWD,
    css: '/css',
    img: '/img',
    js: '/js',
    fonts: '/fonts',
    src: './src',
    dist: 'public/dist',
    template: './src/templates/index.html',
    port: 8080,
    host: 'localhost',
};

const entries = {
    app: './src/index.js',
    // login: './src/login/index.js',
};

PATHS.entries = entries;

module.exports = PATHS;
