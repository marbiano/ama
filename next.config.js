// https://github.com/gregberge/svgr/issues/551#issuecomment-839772396

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
            replaceAttrValues: {
              '#000': 'currentColor',
              '#fff': 'currentColor',
            },
          },
        },
      ],
    });
    return config;
  },
};
