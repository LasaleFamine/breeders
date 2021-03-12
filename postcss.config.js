/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const tokens = {
  '--large-container': '1104px',
  '--medium-container': '656px',
};

module.exports = {
  plugins: {
    /* More info at https://github.com/TrySound/postcss-easy-import */
    'postcss-easy-import': {
      extensions: '.css',
    },
    /* More info https://github.com/csstools/postcss-normalize */
    'postcss-normalize': {},
    /* More info at https://github.com/csstools/postcss-preset-env */
    'postcss-preset-env': {
      stage: 0,
      'prefers-color-scheme-query': false,
      features: {
        'logical-properties-and-values': false,
      },
      importFrom: [
        {
          environmentVariables: tokens,
        },
      ],
      insertAfter: {
        'custom-media-queries': require('postcss-mixins')(),
      },
    },
    // github.com/seaneking/postcss-responsive-type */
    'postcss-responsive-type': {},
    'postcss-inset': {},
    /* More info at https://cssnano.co/ */
    cssnano: {
      preset: [
        'advanced',
        {
          discardComments: {
            removeAll: true,
          },
          reduceIdents: false,
        },
      ],
    },
  },
};
