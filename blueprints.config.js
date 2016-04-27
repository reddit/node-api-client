module.exports = [{
  name: 'apiClient',
  webpack: {
    entry: {
      apiClient: './index.es6.js',
    },
    output: {
      library: "[name].js",
      libraryTarget: "umd",
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', '.es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
    ],
    plugins: [
      'production-loaders',
      'set-node-env',
      // 'minify-and-treeshake',
      'abort-if-errors',
    ],
    externals: {
      lodash: 'commonjs lodash',
      'lodash/object': 'commonjs lodash/object',
      'lodash/lang': 'commonjs lodash/lang',
      'lodash/array': 'commonjs lodash/array',
      'lodash/collection': 'commonjs lodash/collection',
      superagent: 'commonjs superagent',
      'superagent-retry': 'commonjs superagent-retry',
    },
  }
}]
