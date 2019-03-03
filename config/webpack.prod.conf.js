const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf.js");

const buildPath = path.resolve(__dirname, "../public/");
const manifest = require(path.resolve(__dirname,
    `${buildPath}/dll/bundle-manifest.json`
));

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js",
        path: buildPath
        // publicPath: buildPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: buildPath
                        }
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: buildPath
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    mode: "production",
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: manifest
        }),
        new HtmlWebpackPlugin({
            title: "Hello World",
            filename: "index.html",
            template: "index.ejs"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].css"
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, `../public/dll/bundle.dll.js`)
        })
    ],
    optimization: {
        // runtimeChunk: true,
        chunkIds: "named",
        moduleIds: "hashed"
    }
});
