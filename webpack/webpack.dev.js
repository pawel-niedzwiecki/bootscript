const merge = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const config = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}

const prod = merge([
    parts.loadJS(),
    parts.loadSCSS({
        isDev: true,
    }),
    parts.loadImages({
        isDev: true,
    }),
    parts.loadFonts(),
    parts.loadHTML({
        pluginOptions: {
            filename: 'index.html',
            template: path.resolve(__dirname, './../src/index.html'),
            nimify: false,
        }
    }),

    parts.devServer({
        contentBase: path.join(__dirname, '../dist'),
    }),

    parts.BrowserSync(),
]);


module.exports = merge(config, prod);