const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
      bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'todo List',
        filename: 'index.html',
        template: 'src/template.html',
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: false,
  },
};