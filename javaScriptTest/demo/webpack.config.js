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
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['*', '.js', '.css'],
    },
};