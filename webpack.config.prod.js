const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PATHS = require('./Paths');

module.exports = {
    entry: PATHS.entries,
    output: {
        path: path.resolve(__dirname, `${PATHS.dist}`),
        filename: PATHS.js.replace('/', '') + '/[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js',
    },
    resolve: {
        modules: [path.resolve(__dirname, PATHS.src), 'node_modules'],
        extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        // Extract bundle libs file.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        // }),
        new ExtractTextPlugin(PATHS.css.replace('/', '') + '/[name].[chunkhash].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),

        new HtmlWebpackPlugin({
            template: PATHS.template,
            filename: '../index.html'
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
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: [
                                            'last 3 version',
                                            'ie >= 10',
                                        ],
                                    }),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: `${PATHS.img}/[name].[ext]`,
                },
            },
        ],
    },
};
