import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config: webpack.Configuration = {
    entry: {
        bundle: "./src/index.tsx"
    },
    target: "web",
    module: {
        rules: [
            {
                exclude: "/node_modules/",
                test: /\.(ts|tsx)/,
                use: "ts-loader"
            },
            {
                test: /\.(png|svg|mp3)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                    outputPath: "assets/",
                    esModule: false
                }
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
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
        port: 8080
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".png"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            "@app": path.resolve(__dirname, "./src"),
            "dict": path.resolve(__dirname, "./src/dictionary"),
            "components": path.resolve(__dirname, "./src/components"),
            "resources": path.resolve(__dirname, "../resources")
        }
    }
};

export default config;