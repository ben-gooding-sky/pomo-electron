const path = require('path');
const { shared } = require('./alias');

const rootPath = process.cwd();

const common = {
  devtool: 'source-map',
  target: 'electron-main',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      ...shared,
    },
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { node: 'current' },
                },
              ],
              '@babel/preset-typescript',
            ],
            // needed else webpack 4 itself chokes on the syntax
            plugins: ['@babel/plugin-proposal-optional-chaining'],
          },
        },
      },
    ],
  },
};

module.exports = {
  ...common,
  entry: path.resolve(rootPath, 'electron', 'main.ts'),
  output: {
    path: path.resolve(rootPath, 'build'),
    filename: '[name].js',
  },
};
