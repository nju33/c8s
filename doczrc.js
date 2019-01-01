import {css} from 'docz-plugin-css';
const {css: cssPlugin} = require('docz-plugin-css');

module.exports = {
  title: 'c8s',
  typescript: true,
  plugins: [cssPlugin()],

  // https://github.com/pedronauck/docz/issues/551
  wrapper: undefined,
  indexHtml: undefined,
};
