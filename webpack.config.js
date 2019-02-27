// // AUTHOR NA3 GROUP

const prod = require('./webpack/webpack.prod.js');
const dev = require('./webpack/webpack.dev.js');

module.exports = (evn) => {
    if (evn.prod) {
        return prod;
    }
    return dev;
}


// const path = require('path');
// const webpack = require('webpack');
// const glob = require('glob');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanPlugin = require('clean-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');
// const CompressionPlugin = require('compression-webpack-plugin');

// module.exports = {
//     entry: './src/js/index.js',
//     output: {
//         filename: './js/bootscript.js',
//         path: path.resolve(__dirname, 'dist'),
//     },
//     watch: true,
//     devtool: 'source-map',
//     devServer: {
//         port: 3303,
//         contentBase: path.join(__dirname, 'dist'),
//         hot: true,
//         overlay: true,
//     },

//     module: {
//         rules: [{
//                 test: /\.js$/,
//                 use: 'babel-loader'
//             },
//             {
//                 test: /\.scss$/,
//                 use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
//                     publicPath: './../',
//                     use: [{
//                             loader: 'css-loader',
//                             options: {
//                                 sourceMap: true,
//                                 minimize: false,
//                                 url: true,
//                             }
//                         },
//                         {
//                             loader: 'postcss-loader',
//                             options: {
//                                 plugins: (loader) => [
//                                     new require('autoprefixer')(),
//                                 ],
//                                 sourceMap: true,
//                             }
//                         },
//                         {
//                             loader: 'resolve-url-loader',
//                             options: {
//                                 sourceMap: true,
//                             }
//                         },
//                         {
//                             loader: 'sass-loader',
//                             options: {
//                                 sourceMap: true,
//                             }
//                         }
//                     ]
//                 })),
//             },
//             {
//                 test: /\.(jpg|jpeg|gif|png)$/,
//                 use: [{
//                         loader: 'file-loader',
//                         options: {
//                             name: 'images/[name].[ext]',
//                         }
//                     },
//                     {
//                         loader: 'image-webpack-loader',
//                         options: {
//                             mozjpeg: {
//                                 progressive: true,
//                                 quality: 90,
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(woff|woff2)$/,
//                 use: {
//                     loader: 'url-loader',
//                     options: {
//                         limit: 30000,
//                         name: 'fonts/[name].[ext]',
//                     }
//                 }
//             },
//             {
//                 test: /\.(html|pug)$/,
//                 use: [{
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name].html',
//                         }
//                     },
//                     {
//                         loader: 'extract-loader',
//                     },
//                     {
//                         loader: 'html-loader',
//                         options: {
//                             attrs: ['img:src'],
//                         }
//                     },
//                     {
//                         loader: 'pug-html-loader',
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new CleanPlugin('dist'),
//         new ExtractTextPlugin('css/bootscript.css'),

//         new webpack.NamedModulesPlugin(),
//         new webpack.HotModuleReplacementPlugin(),

// new BrowserSyncPlugin({
//     host: 'localhost',
//     port: 3340,
//     proxy: 'http://localhost:3351',
// }, {
//     reload: false,
// }),

//         new PurifyCSSPlugin({
//             paths: glob.sync(path.join(__dirname, '/src/**/*.js'), {
//                 nodir: true
//             }),
//             purifyOptions: {
//                 whitelist: ['*purify*'],
//                 minify: true,
//             }
//         }),


//         new CompressionPlugin({
//             test: /\.(js|css|html)$/,
//             asset: '[path].gz[query]',
//             algorithm: 'gzip',
//         }),
//     ]
// }