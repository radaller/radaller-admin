const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require('./Paths');
// const helpers = require('./helpers');
const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: PATHS.entries,
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        // new OpenBrowserPlugin({ url: PATHS.openInBrowser, browser: 'Google Chrome' }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),

        new HtmlWebpackPlugin({
            template: PATHS.template,
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: [
                                        'last 3 version',
                                        'ie >= 9',
                                    ],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: `.${PATHS.img}/[name].[ext]`,
                },
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: PATHS.host,
        port: PATHS.port,
        headers: { 'Access-Control-Allow-Origin': '*' },
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    },
};
