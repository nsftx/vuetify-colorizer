// eslint-disable-next-line
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  },
};
