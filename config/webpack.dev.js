const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  target: 'node',
  mode: 'development',
  entry: '../src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    alias: {
      Synthetics: path.resolve(__dirname, '../src/__mocks__/Synthetics'),
      SyntheticsLogger: path.resolve(
        __dirname,
        '../src/__mocks__/SyntheticsLogger',
      ),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  }
  return config;
};
