/* eslint: disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/';
const srcPath = './client';


const webpackConfig = {
  entry: {
    index: [
      'react-hot-loader/patch',
      path.resolve(path.resolve(__dirname, '..'), path.resolve(srcPath, 'index.tsx'))
    ]
  },

  // target: 'electron-renderer',
  target: 'web', // default

  resolve: {
    // alias: {
    //   Components: path.resolve(path.resolve(__dirname, '..'), 'src/components/'),
    //   Util: path.resolve(path.resolve(__dirname, '..'), 'src/util/'),
    // },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(path.resolve(__dirname, '..'), 'dist/'),
    publicPath
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        // test: /\.ts(x)$/,
        loader: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(path.resolve(__dirname, '..'), './public/index.html')
    })
  ],
};

module.exports = webpackConfig;
