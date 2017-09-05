const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpackHelpers = require('./webpackHelpers');
const path = require('path');
const PATHS = webpackHelpers.PATHS;

const env = process.env;

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
                NODE_ENV: JSON.stringify(env.NODE_ENV),
                GIT_API_URL: JSON.stringify(env.GIT_API_URL)
            },
        }),

        ...webpackHelpers.getHtmlEntries(),
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
        port: env.DEV_PORT ? env.DEV_PORT : PATHS.port,
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
