#!/usr/bin/env node
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const host = 'localhost'
const port = 3333
const protocol = 'http'
const publicPath = '/static/'

const compiler = webpack({
  entry: {
    app: [
      `webpack-dev-server/client?${protocol}://${host}:${port}`,
      'webpack/hot/dev-server',
      path.join(__dirname, 'main.js')
    ],
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, './build/static/'),
    filename: 'app.js',
    publicPath: publicPath,
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        cssModules: {
          sourceMap: true,
          modules: true,
          importLoaders: 1,
          localIdentName: '[local]_[name]_[hash:base64:5]',
          minimize: false,
        }
      }
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
})

const server = new WebpackDevServer(
  compiler, {
  hot: true,
  inline: true,
  historyApiFallback: {
    rewrites: [
      { from: /./, to: '/static/../index.html' },
    ],
  },
  port,
  publicPath,
  'public': host,
  host,
  contentBase: path.join(__dirname, './build'),
})

server.listen(port)
console.log(`listening on ${protocol}://${host}:${port}`)