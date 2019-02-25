//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const webpack = require('webpack');

exports.loadJS = ({
    test = /\.(js|jsx)$/,
    exclude = /node_modules/,
} = {}) => {

    return {
        module: {
            rules: [
                {
                    test,
                    exclude,
                    use: 'babel-loader'
                }
            ]
        }
    }
}

exports.loadSCSS = ({
    isDev = false,
} = {}) => {

    //extractOptions.disable = isDev;

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use:
                        [
                            isDev ? 'style-loader' : MiniCSSPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    modules: true,
                                    localIdentName: '[name]__[local]--[hash:base64:5]-purify',
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: (loader) => [
                                        new require('autoprefixer')(),
                                    ],
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                }
                            }
                        ]

                }
            ]
        },

        plugins: [
            new MiniCSSPlugin(),
            //new ExtractTextPlugin(extractOptions),
        ]
    }
}

exports.loadImages = ({
    fileOptions = {
        name: 'images/[name].[ext]',
    },
    imageOptions,
    isDev = false,
} = {}) => {

    const loaders = [{
        loader: 'file-loader',
        options: fileOptions,
    }];

    if (isDev === false) {
        loaders.push({
            loader: 'image-webpack-loader',
            options: imageOptions,
        });
    }

    return {
        module: {
            rules: [
                {
                    test: /\.(jpg|jpeg|gif|png)$/,
                    exclude: /node_modules/,
                    use: loaders,
                }
            ]
        }
    }
}

exports.loadFonts = ({
    test = /\.(woff|woff2)$/,
    exclude = /node_modules/,
    options = {
        limit: 30000,
        name: 'fonts/[name].[ext]',
    }
} = {}) => {

    return {
        module: {
            rules: [
                {
                    test,
                    exclude,
                    use: {
                        loader: 'url-loader',
                        options
                    }
                }
            ]
        }
    }
}

exports.loadHTML = ({
    pluginOptions
} = {}) => {

    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: [

                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['img:src'],
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            new HTMLPlugin(pluginOptions),
        ]
    }
}

exports.CleanPlugin = ({ paths, options }) => {

    return {
        plugins: [
            new CleanPlugin(paths, options),
        ]
    }
}

exports.PurifyCSSPlugin = ({ paths, purifyOptions }) => {

    return {
        plugins: [
            new PurifyCSSPlugin({
                paths,
                purifyOptions,
            }),
        ]
    }
}

exports.CompressionPlugin = () => {

    return {
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css|html)$/,
            }),
        ]
    }
}

exports.extractBundle = ({
    name = 'libs',
} = {}) => {

    return {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    app: {
                        test: /node_modules/,
                        name: 'libs',
                        chunks: 'all',
                    }
                }
            }
        },
        plugins: [
            /*
            new webpack.HashedModuleIdsPlugin(),

            new webpack.optimize.CommonsChunkPlugin({
                name,
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: '_',
            }),*/
        ]
    }
}

exports.devServer = ({
    port = 9005,
    hot = true,
    overlay = true,
    contentBase
} = {}) => {

    const plugins = [];
    if (hot) {
        plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        )
    }

    return {
        devServer: {
            port,
            contentBase,
            hot,
            overlay,
        },

        plugins
    }
}

exports.BrowserSync = ({
    host = 'localhost',
    port = 9105,
    proxy = 'http://localhost:9005',
    options = {
        reload: false,
    },
} = {}) => {

    return {
        plugins: [
            new BrowserSyncPlugin({
                host,
                port,
                proxy,
            }, options)
        ]
    }
}