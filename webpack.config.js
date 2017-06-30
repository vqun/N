const path = require('path'), fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const styleExtractor = new ExtractTextPlugin({ filename: 'styles/[name].css?v=[contenthash:8]', allChunks: true })
const RESOLVED_EXTENSIONS = ['.ts', '.tsx', '.js', '.json']
const baseConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].bundle.js'
  },
  resolve: {
    extensions: RESOLVED_EXTENSIONS
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader',
          {
            loader: 'c-loader',
            options: {
              css: true,
              postfix: 'less',
              module: 'import'
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        loader: styleExtractor.extract({
          use: 'css-loader?sourceMap&minimize!postcss-loader!less-loader',
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|webp|ttf|woff2?|otf|eot|svg|docx?|pptx?|xlsx?|pdf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?v=[hash:8]',
          },
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    styleExtractor,
    new CopyWebpackPlugin([{
      from: '**/*.html'
    }]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9000,
      server: { baseDir: ['dist'] },
      open: false,
      ui: {
        port: 9090,
        weinre: {
          port: 9091
        }
      }
    })
  ],
  devtool: 'source-map'
};

const parseBool = v => v !== 'false';

module.exports = function(env) {
  const isBuild = parseBool(env.build)
  if(isBuild) {
    baseConfig.output.path = path.resolve(__dirname, 'build')
    baseConfig.devtool = ''
  }
  const configs = [], base = path.resolve(__dirname, 'pages');
  const directories = fs.readdirSync(base);
  directories.forEach(function(dir) {
    const ctx = path.resolve(base, dir), stat = fs.statSync(ctx), ext = path.extname(dir), name = path.basename(dir, ext);
    if(stat.isFile()) {
      RESOLVED_EXTENSIONS.indexOf(ext) !== -1 && configs.push(Object.assign(createBaseConfig(), {
        context: base,
        entry: {
          [name]: `./${name}`
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
};

function produceEntries(base, prefix = '') {
  const files = fs.readdirSync(base);
  return files.reduce((prev, file) => {
    const _file = path.resolve(base, file), ext = path.extname(file);
    const name = `${prefix ? `${prefix}/` : ''}${path.basename(file, ext)}`, stat = fs.statSync(_file);
    if(stat.isFile() && RESOLVED_EXTENSIONS.indexOf(ext) !== -1) return Object.assign({}, prev, { [name]: `./${name}` });
    if(stat.isDirectory()) return Object.assign(prev, produceEntries(_file, name))
    return prev
  }, {})
}

function createBaseConfig(out = '') {
  const config = Object.assign({}, baseConfig);
  config.output = Object.assign({}, config.output, { path: path.resolve(config.output.path, out) })
  return config
}