module.exports = function (webpackEnv) {
  // ...
  return {
    // ...
    resolve: {
      modules: ['app', 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },
    node: { fs: 'empty' },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
  }
}