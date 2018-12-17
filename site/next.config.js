const path = require('path');
const {PHASE_PRODUCTION_SERVER} =
  process.env.NODE_ENV === 'development'
    ? {}
    : require('next-server/constants');

const webpack = (config, a) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-url-loader',
        options: {
          encoding: 'base64',
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.md$/,
    use: ['html-loader', 'markdown-loader'],
  });

  // ---
  // dev: true,
  // isServer: false,
  // buildId: 'development',
  // ---
  // [ { test: /\.+(tsx|ts|jsx|js)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site/pages' ],
  //   use: { loader: 'hot-self-accept-loader', options: [Object] } },
  // { test: /\.(js|jsx)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site' ],
  //   exclude: /node_modules/,
  //   use: { loader: 'next-babel-loader', options: [Object] } },
  // { test: /\.css$/,
  //   use:
  //    [ 'extracted-loader',
  //      '/Users/nju33/nju33/c8s/node_modules/mini-css-extract-plugin/dist/loader.js',
  //      [Object] ] },
  // { test: /\.(ts|tsx)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site' ],
  //   exclude: /node_modules/,
  //   use: { loader: 'next-babel-loader', options: [Object] } },
  // { test: /\.svg$/, use: [ [Object] ] },
  // { test: /\.md$/, use: [ 'html-loader', 'markdown-loader' ] } ]

  // ---
  // dev: true,
  // isServer: true,
  // buildId: 'development',
  // ---
  // [ { test: /\.(js|jsx)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site' ],
  //   exclude: /node_modules/,
  //   use: { loader: 'next-babel-loader', options: [Object] } },
  // { test: /\.css$/, use: [ 'ignore-loader' ] },
  // { test: /\.(ts|tsx)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site' ],
  //   exclude: /node_modules/,
  //   use: { loader: 'next-babel-loader', options: [Object] } },
  // { test: /\.svg$/, use: [ [Object] ] },
  // { test: /\.md$/, use: [ 'html-loader', 'markdown-loader' ] } ]

  // { test: /\.+(tsx|ts|jsx|js)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site/pages' ],
  //   use:
  //    { loader: 'hot-self-accept-loader',
  //      options: { include: [Array], extensions: /\.+(tsx|ts|jsx|js)$/ } } }
  // { test: /\.(ts|tsx)$/,
  //   include: [ '/Users/nju33/nju33/c8s/site' ],
  //   exclude: /node_modules/,
  //   use:
  //    { loader: 'next-babel-loader',
  //      options:
  //       { dev: true, isServer: true, cwd: '/Users/nju33/nju33/c8s/site' } } }
  // const ruleForTs = config.module.rules.find(({test}) => test.test('test.tsx'));


  const ruleForTs = config.module.rules.forEach(rule => {
    if (rule.test.test('_.tsx') || rule.test.test('_.jsx')) {
      rule.include.push(path.resolve(__dirname, '../components'));
    }
    // console.log(rule);
  });

  // console.log(JSON.stringify(config, null, 2));
  // console.log(config.module.rules);
  // process.exit(0);

  return config;
};

module.exports = (phase, {defaultConfig}) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {};
  }

  const css = require('@zeit/next-css');
  const ts = require('@zeit/next-typescript');

  return css(ts({webpack}));
};
