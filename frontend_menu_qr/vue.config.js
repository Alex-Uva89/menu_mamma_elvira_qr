const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin'); // Importa TerserPlugin

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true),
      })
    ],
    optimization: {
      minimize: true, 
      minimizer: [
        new TerserPlugin({ 
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    }
  },
  pwa: {
    name: 'My PWA App',
    themeColor: '#ffffff',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/menu-mammaelvira-fe-80d79ebfc254\.herokuapp\.com\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'menu-mammaelvira-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, 
            },
          },
        },
      ]
    }
  }
});
