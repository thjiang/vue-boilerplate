const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");
const HappyPack = require("happypack");

module.exports = {
    entry: {
        app: "./src/main.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    // 'thread-loader',
                    // 'cache-loader',
                    "vue-loader"
                ]
            },
            {
                test: /\.js$/,
                loader: "happypack/loader?id=js",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    name: "img/[name].[ext]",
                    limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    name: "fonts/[name].[ext]",
                    limit: 10000
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new NyanProgressPlugin({
            restoreCursorPosition: true,
            debounceInterval: 50,
            nyanCatSays: progress => progress === 1 && "呦,写BUG呢？"
        }),
        new VueLoaderPlugin(),
        // new ProgressBarPlugin(),
        new HappyPack({
            id: "js",
            threads: 4,
            verbose: false,
            loaders: ["babel-loader?cacheDirectory=true"]
        })
    ],
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    },
    stats: {
        modules: false,
        entrypoints: false, // MiniCssExtractPlugin的日志太烦了
        children: false
    },
    performance: {
        hints: false
    }
    // devtool: '#cheap-module-eval-source-map'
};
