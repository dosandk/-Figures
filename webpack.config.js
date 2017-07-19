const webpack = require('webpack');
const path = require('path');

module.exports  = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './app.js'
    },    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets', 
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        port: 4200
    },
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    }
};