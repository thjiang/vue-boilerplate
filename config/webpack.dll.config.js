const webpack = require("webpack");
const path = require("path");

const buildPath = path.resolve(__dirname, "../public/dll");

module.exports = (env) => {
    return {
        entry: {
            bundle: [
                "vue",
                "vue-router",
                "axios"
                // 'element-ui'
            ]
        },
        output: {
            path: `${buildPath}`,
            filename: "[name].dll.js",
            library: "[name]_library"
        },
        // mode: env.NODE_ENV === 'prod' ? 'production' : 'development',
        mode: "production",
        plugins: [
            new webpack.DllPlugin({
                path: `${buildPath}/[name]-manifest.json`,
                name: "[name]_library",
                context: __dirname
            })
        ]
    };
};
