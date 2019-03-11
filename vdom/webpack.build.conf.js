/**
 * Created by ximing on 2018/8/3.
 */

const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMmerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('../webpack.common.config');

const env = process.env.NODE_ENV || 'development';

module.exports = webpackMmerge(common, {
    mode: 'production', // "production" | "development" | "none"
    entry: {
        vdom: './src/index.js',
    },
    output: {
        library: '[name]',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, '../dist/vdom'),
        filename: '[name].[hash].js',
        publicPath: `/react/`
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    // devtool: 'source-map',
    devtool: 'cheap-module-eval-source-map',
    context: __dirname,
    target: 'web',
    stats: 'errors-only', // lets you precisely control what bundle information gets displayed
    plugins: [new ManifestPlugin()],
    externals: [
        /^lodash$/,
        /^jquery$/,
        /^single-spa$/,
        /^react$/,
        /^react\/lib.*/,
        /^react-dom$/,
        /.*react-dom.*/,
        /^rxjs\/?.*$/
    ]
});
