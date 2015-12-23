var webpack = require("webpack");

module.exports = {
  entry: {
    app: './public/javascripts/main.js',
    polyfills: ['JSON2', 'html5shiv']
  },
  output: {
    path: 'public/javascripts',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { include: /\.json$/, loaders: ['json-loader'] }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'node_modules/mojular/node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};
