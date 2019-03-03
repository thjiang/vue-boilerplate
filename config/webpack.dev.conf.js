const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf.js");

const manifest = require(path.resolve(
    __dirname,
    `../public/dll/bundle-manifest.json`
));

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        path: path.join(__dirname, "build"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    // devtool: '#cheap-module-eval-source-map',
    mode: "development",
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: manifest
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "Hello World",
            template: "index.ejs",
            isDev: true
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, `../public/dll/bundle.dll.js`)
        })
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     logLevel: 'info'
        // })
    ],
    devServer: {
        open: true,
        contentBase: "/build/",
        // openPage: '/',
        inline: true,
        quiet: false,
        disableHostCheck: true, // 解决 Invalid Host Header，禁用 host header 正确性检测
        port: 8080,
        stats: "minimal",
        historyApiFallback: true
    }
});
