const config = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: './public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        include: 'not_exist_path',
        loader: 'style-loader!css-loader',
      }
    ]
  },

};

module.exports = config;
