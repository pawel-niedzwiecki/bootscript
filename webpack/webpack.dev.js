// AUTHOR NA3 GROUP
const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.root.js');
const glob = require('glob');

const config = {
    entry: './src/js/index.js',
    output: {
        filename: './js/bootscript.js',
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: 'source-map',
    watch: true,
    devServer: {
        port: 3303,
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: true,
    },
}

const prod = merge([
    parts.loadJS(),
    parts.loadSCSS({
        isDev: true,
    }),
    parts.loadIMG({
        isDev: true,
    }),
    parts.loadFONT(),
    parts.loadHTML(),
    parts.devSERWER({
        contentBase: path.join(__dirname, '../dist'),
    }),
    parts.BrowserSync(),
]);


module.exports = merge(config, prod);