// craco.config.js
module.exports = {
  // mode  : 'development',
  // devServer: {
  //   port:8001,
  // },
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }