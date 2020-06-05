const path = require("path")
const webpack = require("webpack")
const koa = require("koa")
const express = require("express")
const chalk = require("chalk")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")

function staticResolve(file) {
  return path.resolve(__dirname, "../static/pages", file)
}

const buildConfig = {
  context: path.resolve(__dirname, "../"),
  entry: {
    home: staticResolve("home.js"),
    details: staticResolve("details.js"),
    life: staticResolve("life.js")
  },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".ejs", ".json", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../static")
    }
  },
  module: {
    rules: [
      {
        test: /(\.html|\.xml)$/,
        use: [
          {
            loader: "html-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./"
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
          publicPath: "./images/",
          outputPath: "images/"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
          publicPath: "./media/",
          outputPath: "media/"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
          publicPath: "./fonts/",
          outputPath: "fonts/"
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format:
        chalk.green("Building: ") +
        "[:bar]" +
        chalk.green(" :percent ") +
        chalk.yellow("(:elapsed seconds)"),
      width: 30,
      complete: chalk.green.bold("■"),
      incomplete: "-"
    })
  ]
}

webpack(buildConfig, (err, stats) => {
  if (err) {
    console.log(err)
  }
  chalk.green("build succeed")
})
