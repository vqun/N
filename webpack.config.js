const path = require('path'), fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'pages'),
  entry: produceEntries('pages'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                "targets": {
                  "browsers": ["last 5 versions"]
                }
              }]
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin()
  ]
};

module.exports = config;

function produceEntries(context, prefix = '') {
  const base = path.resolve(__dirname, context), files = fs.readdirSync(base);
  return files.reduce((prev, file) => {
    const _file = path.resolve(base, file), name = `${prefix ? `${prefix}/` : ''}${file}`.replace(/\.js$/, ''), stat = fs.statSync(_file);
    if(stat.isFile()) return Object.assign({}, prev, { [name]: `./${name}` });
    if(stat.isDirectory()) return Object.assign(prev, produceEntries(_file, name))
  }, {})
}