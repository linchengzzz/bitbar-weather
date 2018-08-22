const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    target: 'node',
    output: {
        path: path.resolve('./dist'),
        filename: 'weather.js'
    },
    resolve: {
        extensions: ['*', '.js']
    },
    context: __dirname,
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: false,
        __dirname: false,
        setImmediate: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new CleanWebpackPlugin(['./dist'])],
    mode: 'production'
};
