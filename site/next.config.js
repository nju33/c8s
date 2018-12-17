const {PHASE_PRODUCTION_SERVER} =
  process.env.NODE_ENV === 'development' ? {} : require('next-server/constants');

const webpack = config => {
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
