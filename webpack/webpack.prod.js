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
    devServer: {
        port: 3303,
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: true,
    },
}

const prod = merge([
    parts.loadJS(),
    parts.loadSCSS(),
    parts.loadIMG({
        imageOptions: {
            mozjpeg: {
                progressive: true,
                quality: 90,
            }
        }
    }),
    parts.loadFONT(),
    parts.loadHTML(),
    parts.CleanPlugin({
        paths: ['dist'],
        options: {
            root: path.resolve(__dirname, '..'),
        }
    }),
    parts.PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '/src/**/*.(js|jsx)'), {
            nodir: true
        }),
        purifyOptions: {
            whitelist: ['*purify*'],
            minify: true,
        }
    }),
    parts.CompressionPlugin(),

]);


module.exports = merge(config, prod);