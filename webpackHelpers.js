const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    admin: './src/admin/index.js',
    index: './src/index.js',
};

const getHtmlEntries = () => {
    const arr = [];

    Object.keys(entries).forEach((key) => {
        arr.push(
            new HtmlWebpackPlugin({
                template: PATHS.template,
                filename: key + '.html',
                chunks: [key]
            }),
        )
    });

    return arr;
};

PATHS.entries = entries;

module.exports = {
    PATHS,
    getHtmlEntries,
};
