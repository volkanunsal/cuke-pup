import { createFsFromVolume, Volume } from 'memfs';
import path from 'path';
import webpack from 'webpack';

export default (fixture, options = {}) => {
  const compiler = webpack({
    mode: 'development',
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.feature$/,
          use: {
            loader: path.resolve(__dirname, './index.js'),
            options,
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};
