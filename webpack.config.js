var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var definePlugin = webpack.DefinePlugin;

module.exports = {
  mode: "production",
  entry: './demo/index.jsx',
  output: {
    path: path.resolve(__dirname, './demo/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules:[{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
