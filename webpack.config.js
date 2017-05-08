const path = require('path'), fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const styleExtractor = new ExtractTextPlugin({ filename: 'styles/[name].css?v=[contenthash:8]', allChunks: true })
const baseConfig = {
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
        }, {
          loader: 'c-loader',
          options: {
            css: true,
            postfix: 'less',
          },
        }]
      },
      {
        test: /\.(css|less)$/,
        loader: styleExtractor.extract({
          use: 'css-loader!postcss-loader!less-loader',
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|webp|ttf|woff2?|otf|eot|svg|docx?|pptx?|xlsx?|pdf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?v=[hash:8]',
          },
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    styleExtractor,
    new HtmlWebpackPlugin()
  ]
};

module.exports = (function() {
  const configs = [], base = path.resolve(__dirname, 'pages');
  const directories = fs.readdirSync(base);
  directories.forEach(function(dir) {
    const ctx = path.resolve(base, dir), stat = fs.statSync(ctx);
    if(stat.isFile()) {
      path.extname(dir) === '.js' && configs.push(Object.assign(createBaseConfig(), {
        context: base,
        entry: {
          [path.basename(dir, '.js')]: `./${dir}`
        }
      }))
    } else {
      configs.push(Object.assign(createBaseConfig(dir), {
        context: ctx,
        entry: produceEntries(ctx)
      }))
    }
  })
  return configs
})();

function produceEntries(base, prefix = '') {
  const files = fs.readdirSync(base);
  return files.reduce((prev, file) => {
    const _file = path.resolve(base, file), name = `${prefix ? `${prefix}/` : ''}${file}`.replace(/\.js$/, ''), stat = fs.statSync(_file);
    if(stat.isFile() && path.extname(file) === '.js') return Object.assign({}, prev, { [name]: `./${name}` });
    if(stat.isDirectory()) return Object.assign(prev, produceEntries(_file, name))
    return prev
  }, {})
}

function createBaseConfig(out = '') {
  const config = Object.assign({}, baseConfig);
  config.output = Object.assign({}, config.output, { path: path.resolve(__dirname, out ? `dist/${out}` : 'dist')})
  return config
}