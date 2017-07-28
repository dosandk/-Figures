const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports  = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './app.js'
    },    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/', 
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        port: 4200
    },
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
            { 
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                })
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new ExtractTextPlugin("manifest.json"),
  ]
};