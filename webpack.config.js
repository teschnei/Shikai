const path = require("path");

//Plugins
const CssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV != "production";

module.exports = {
    entry: {
        index: path.resolve("./src/js/index.jsx"),
        monitor: path.resolve("./src/js/monitor.jsx")
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist")
    },
    mode: devMode ? "development" : "production",
    plugins: [
        new HtmlPlugin({
            filename: "index.html",
            template: "src/index.html",
            chunks: ["index"],
            inject: "body"
        }),
        new HtmlPlugin({
            filename: "monitor.html",
            template: "src/index.html",
            chunks: ["monitor"],
            inject: "body"
        }),
        new CssExtractPlugin({
            filename: "[name].css"
        }),
        new CopyPlugin({
            patterns: [{
                from: "./src/assets/runtime",
                to: "./assets"
            }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    devMode ? "style-loader" : CssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: devMode,
                            sassOptions: {
                                outputStyle: devMode ? "expanded" : "compressed"
                            }
                        }
                    }, 
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["autoprefixer"]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_module/ ,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        envName: devMode ? "development" : "production"
                    }
                }
            },
            {
                test: /\.svg$/,
                use: [{loader: "svg-react-loader"}]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {filename: "assets/fonts/[name][ext]"}
            },
            {
                test: /\.(yml)$/i,
                type: "asset/resource",
                generator: {filename: "[name][ext]"}
            }
        ]//noParse: /\.(woff|woff2|eot|ttf|otf)$/
    },
    resolve: {
        extensions: [".js", ".min.js", ".jsx"],
        mainFiles: ["index"],
        modules: ["src/js", "./node_modules", "src"]
    },
    optimization: {
        minimize: !devMode,
        minimizer: [
            new CssMinimizerPlugin(), 
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    type: "css/mini-exctract",
                    chunks: "all",
                    enforce: true
                }
            }
        }

    },
    devtool: devMode ?  "eval" : false
};