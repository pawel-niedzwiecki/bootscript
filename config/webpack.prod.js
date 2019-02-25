const merge = require('webpack-merge');
const glob = require('glob');
const path = require('path');

const parts = require('./webpack.parts');
 
const config = {
    entry: {
        app: './src/index.js',
        //libs: ['react', 'react-dom', 'react-css-modules'],
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    mode: 'production',
    devtool: false,
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}

const prod = merge([
    parts.loadJS(),
    parts.loadSCSS(),
    parts.loadImages({
        imageOptions: {
            mozjpeg: {
                progressive: true,
                quality: 90,
            }
        }
    }),
    parts.loadFonts(),
    parts.loadHTML({
        pluginOptions: {
            filename: 'index.html',
            template: path.resolve(__dirname, './../src/index.html'),
            nimify: {},
        }
    }),
    parts.CleanPlugin({
        paths: ['dist'],
        options: {
            root: path.resolve(__dirname, '..'),
        }
    }),

    parts.PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '/src/**/*.(js|jsx)'), { nodir: true }),
        purifyOptions: {
            whitelist: ['*purify*'],
            minify: true,
        }
    }),

    parts.CompressionPlugin(),
    parts.extractBundle(),
]);


module.exports = merge(config, prod);