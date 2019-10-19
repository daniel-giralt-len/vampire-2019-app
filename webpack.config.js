const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(otf|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true
    }
}