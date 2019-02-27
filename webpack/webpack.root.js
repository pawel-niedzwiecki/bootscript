// AUTHOR NA3 GROUP
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


// EXPORT DEV SERWER START

module.exports.devSERWER = ({
    port = 3305,
    contentBase = path.join(__dirname, '../dist'),
    hot = true,
    overlay = true,

} = {}) => {
    const plugins = [];
    if (hot) {
        plugins.push(new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(), )
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

// EXPORT DEV SERWER STOP

// ##############

// EXPORT BROWSERSYNC START

module.exports.BrowserSync = ({
    host = 'localhost',
    port = 3301,
    proxy = 'http://localhost:3305',
    options = {
        reload: false,
    }
} = {}) => {

    return {
        plugins: [
            new BrowserSyncPlugin({
                    host,
                    port,
                    proxy,
                }, options

            )
        ]
    }
}

// EXPORT BROWSERSYNC STOP

// ##############

// EXPORT JS START

module.exports.loadJS = ({
    test = /\.(js|jsx)$/,
    exclude = /node_modules/,
} = {}) => {
    return {
        module: {
            rules: [{
                test,
                exclude,
                use: 'babel-loader'
            }]
        }
    }
}

// EXPORT JS STOP

// ##############

// EXPORT SCSS START

module.exports.loadSCSS = ({
    extractOptions = {
        filename: './css/bootscript.css',
        allChunks: true,
    },
    isDev = false,
} = {}) => {

    extractOptions.disable = isDev;

    return {
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: './../',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: false,
                                url: true,
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
                }),
            }]
        },
        plugins: [
            new ExtractTextPlugin(extractOptions)
        ]
    }
}

// EXPORT SCSS STOP

// ##############

// EXPORT IMG START

module.exports.loadIMG = ({
    imagePart = {
        name: 'images/[name].[ext]',
    },
    imageOptions,
    isDev = false,
} = {}) => {

    const loaders = [{
        loader: 'file-loader',
        options: imagePart,
    }];

    if (isDev === false) {
        loaders.push({
            loader: 'image-webpack-loader',
            options: imageOptions,
        });
    }
    return {
        module: {
            rules: [{
                test: /\.(jpg|jpeg|gif|png)$/,
                use: loaders,
            }]
        }
    }
}

// EXPORT IMG STOP

// ##############

// EXPORT FONT START

module.exports.loadFONT = ({
    test = /\.(woff|woff2)$/,
    exclude = /node_modules/,
    options = {
        limit: 30000,
        name: 'fonts/[name].[ext]',
    }
} = {}) => {
    return {
        module: {
            rules: [{
                test,
                exclude,
                use: {
                    loader: 'url-loader',
                    options
                }
            }]
        }
    }
}

// EXPORT FONT STOP

// ##############

// EXPORT HTML START

module.exports.loadHTML = ({
    test = /\.(html|pug)$/,
} = {}) => {
    return {
        module: {
            rules: [{
                test,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].html',
                        }
                    },
                    {
                        loader: 'extract-loader',
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src'],
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                    }
                ]
            }]
        }
    }
}

// EXPORT HTML STOP

// ##############

// EXPORT CLEAN START

module.exports.CleanPlugin = ({
    paths,
    options
}) => {

    return {
        plugins: [
            new CleanPlugin(paths, options),
        ]
    }
}

// EXPORT CLEAN STOP

// ##############

// EXPORT PURIFYCSS START

module.exports.PurifyCSSPlugin = ({
    paths,
    purifyOptions
}) => {

    return {
        plugins: [
            new PurifyCSSPlugin({
                paths,
                purifyOptions,
            }),
        ]
    }
}

// EXPORT PURIFYCSS STOP

// ##############

// EXPORT COMPRESIONPLUGIN START

module.exports.CompressionPlugin = () => {

    return {
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css|html)$/,
            }),
        ]
    }
}


// EXPORT COMPRESIONPLUGIN STOP