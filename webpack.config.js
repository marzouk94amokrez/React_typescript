const path = require('path');
const webpack = require('webpack');

const defaultConfigs = require('react-scripts/config/webpack.config');

function override(config) {
  config.devServer = {
    ...config.devServer,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  };

  config.resolve = {
    ...config.resolve,
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  };

  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url")
  })
  config.resolve.fallback = fallback;

  // Modules
  config.module = {
    ...config.module,
    rules: (config.module.rules || []).concat([
      {
        test: /.\.md$/, // see comment below!
        type: 'javascript/auto', // Tell webpack to interpret the result from examples-loader as JavaScript
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.json" // important to have "noEmit": false in the config
          }
        }],
        exclude: /node_modules/,
      },
    ])
  }

  // Plugins
  config.plugins = (config.plugins || []).concat([
    // Rewrites the absolute paths to those two files into relative paths
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/requireInRuntime$/,
      'react-styleguidist/lib/loaders/utils/client/requireInRuntime'
    ),
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/evalInContext$/,
      'react-styleguidist/lib/loaders/utils/client/evalInContext'
    ),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])

  return config;
}

module.exports = override(defaultConfigs(process.env.NODE_ENV));
