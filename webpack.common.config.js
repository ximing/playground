/**
 * Created by yeanzhi on 16/7/19.
 */

const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const lessToJs = require('less-vars-to-js');
const themer = lessToJs(require('fs').readFileSync(path.join(__dirname, './theme.less'), 'utf8'));

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: themer,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            lodash: path.resolve(__dirname, 'node_modules/lodash/lodash.min.js'),
            systemjs: path.resolve(__dirname, 'node_modules/systemjs/dist/system.js')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new webpack.ProvidePlugin({})
    ]
};
