const path = require('path');

module.exports = {
    entry: "./src/js/root/root.js",
    output: {
        filename: 'bootscript.main.js',
        path: path.resolve(__dirname, "dist/js"),
    },
    mode: 'development',
    devtool: 'source-map',
    watch: true,
}