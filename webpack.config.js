const path = require('path'), fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: produceEntries('pages'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  babel: {
    presets: [
      [
        "env",
        {
          "targets": {
            "browsers": ["last 5 versions"]
          }
        }
      ]
    ]
  }
};

module.exports = config;

function produceEntries(context) {
  const files = fs.readdirSync(path.resolve(__dirname, context));
  return files.reduce((prev, file) => {
    const stat = fs.statSync(file)
    if(stat.isFile) return prev[file] = file;
    // TODO: 将/转换为.
    if(stat.isDirectory) return Object.assign(prev, produceEntries(file))
  }, {})
}