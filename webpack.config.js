const path = require('path');

module.exports = {
  entry: './src/scripts/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src/scripts')],
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    publicPath: 'out',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
  },
  optimization: {
    minimize: false
  },
  mode: 'production',
  performance: {
    // hints: false,
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
};
