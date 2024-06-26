import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config: webpack.Configuration = {
    entry: {
        bundle: "./src/index.tsx"
    },
    target: "web",
    output: {
        filename: "[name]-[hash].js",
        assetModuleFilename: data => data.filename!.slice(3)
    },
    module: {
        rules: [
            {
                exclude: "/node_modules/",
                test: /\.(ts|tsx)/,
                use: "ts-loader"
            },
            {
                test: /\.(png|svg|mp3)$/i,
                type: "asset/resource"
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                namedExport: false,
                                exportLocalsConvention: "as-is",
                                localIdentName: "[path][name]-[local]"
                            }
                        }
                    },
                    "stylus-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            chunks: ["bundle"]
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        historyApiFallback: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".png", ".styl"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            "@app": path.resolve(__dirname, "./src"),
            "dictionary": path.resolve(__dirname, "./src/dictionary-jsons"),
            "app-types": path.resolve(__dirname, "./src/types/app-types"),
            "components": path.resolve(__dirname, "./src/components"),
            "resources": path.resolve(__dirname, "../resources"),
            "util": path.resolve(__dirname, "./src/util")
        }
    }
};

export default config;