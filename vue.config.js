// eslint-disable-next-line
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [];

if (process.env.NODE_ENV !== 'production') {
  // plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
    plugins,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuetify-colorizer' // prod
    : '/', // dev

};
