import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import { travelDir, getEntries, getEntireName } from './tools/helps';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};
const viewsPath = '/views/';
const dataPath = '/ftl-mocks/';
const mockPath = [];
travelDir('.' + viewsPath, mockPath);
let newEntries = getEntries(['./source/entries/**/*.js'],['webpack-hot-middleware/client?reload=true']);

let argvFilter = process.argv.slice(-1);
if (argvFilter && argvFilter[0]) {
  argvFilter = argvFilter[0];
}
let isFilterArgv = false;

if (/--filter=[\w\-]+/.test(argvFilter)) {
  isFilterArgv = true;
  argvFilter = argvFilter.replace(/-?-?filter=([\w\-]+)/, '$1');
}
const getHtmlWebpackPlugin = () => {
  const htmlWebpackPlugin = mockPath
    .filter((pt) => {
      return pt.indexOf(`${path.sep}common${path.sep}`) === -1;
    })
    .filter((pt) => {
      if (isFilterArgv) {
        return pt.indexOf(argvFilter) > -1;
      }
      return true;
    })
    .map((pt) => {
      const chunkName = getEntireName(pt);
      return new HtmlWebpackPlugin({
        filename: chunkName + '.html',
        template: pt,
        chunks: [chunkName]
      });
    })
  return htmlWebpackPlugin;

}
export default {
  entry: Object.assign(newEntries, {
  }),
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
        debug: true,
        noInfo: true // set to false to see a list of every file being bundled.
      }
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
    new webpack.NoEmitOnErrorsPlugin(),
  ].concat(getHtmlWebpackPlugin()),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'source'),
        ],
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader?limit=100000'
        }]
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
        }]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.ico$/,
        use: [{
          loader: 'file-loader?name=[name].[ext]'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'postcss-loader?'
        }, {
          loader: 'less-loader?',

        }]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './source/assets/css/lib'),
          path.join(__dirname, 'node_modules/antd')
        ],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'postcss-loader?'
        }]
      },
      {
        test: /(\.ftl)$/,
        use: [{
          loader: 'ejs-loader'
        }, {
          loader: 'ftl-loader',
          options: {
            // 指定ftl模板的路径
            dataPath: dataPath,
            // 指定ftl的mock数据的路径
            templatePath: viewsPath,
          }
        }]
      }
    ]
  },
  // 定义loader从哪里搜索
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'tools')
    ]
  }
}