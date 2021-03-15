/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const tokens = {
  '--large-container': '1104px',
  '--medium-container': '656px',
  '--shadow-base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  '--shadow-mid': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '--shadow-big': '20px 20px 60px #eee, -20px -20px 60px #eee',
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
