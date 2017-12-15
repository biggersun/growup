const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/polygon.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader?forceEnv=browser',
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['*', '.js', '.css'],
    },
};