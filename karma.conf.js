module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'server/**/*.js',
      'client/**/*.js',
      'test/**/*.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'server/**/*.js': ['babelSourceMap'],
      'client/**/*.js': ['babelSourceMap'],
      'test/**/*.js': ['babelSourceMap'],
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-babel-preprocessor',
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    customPreprocessors: {
      babelSourceMap: {
        base: 'babel',
        options: {
          presets: ['es2015', 'stage-0'],
          sourceMap: 'inline',
          'plugins': [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
          ],
          'ignore': 'node_modules',
        },
        filename: function babelTestFileName(file) {
          return file.originalPath.replace(/\.js$/, '.es5.js');
        },
        sourceFileName: function babelSourceFileName(file) {
          return file.originalPath;
        }
      },
    }
  });
};
