const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/js/root/root.js",
    output: {
        filename: 'bootscript.min.js',
        path: path.resolve(__dirname, "dev/js"),
    },
    mode: 'development',
    devtool: 'source-map',
    watch: true,

    module: {
        rules: [{

                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',

            },
            {
                test: /\.s?[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,

                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                new require('autoprefixer')(),
                            ],
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./../css/bootscript.min.css"
        })

    ]
};