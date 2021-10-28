const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  entry: {
    canary1: path.resolve(__dirname, '../canaries/canary1.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  optimization: {
    minimize: isProduction,
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /cucumber/,
      path.resolve(__dirname, './runtime.ts'),
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.feature$/i,
        loader: path.resolve(__dirname, './loaders/GherkinLoader'),
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    alias: isProduction
      ? {
          Synthetics: path.resolve(__dirname, '../src/__mocks__/Synthetics'),
          SyntheticsLogger: path.resolve(
            __dirname,
            '../src/__mocks__/SyntheticsLogger',
          ),
        }
      : {},
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
  }
  return config;
};
