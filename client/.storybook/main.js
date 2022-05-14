module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\,css&/,
  //     use: [
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           ident: 'postcss',
  //           plugins: [
  //             require('tailwindcss'),
  //             require('autoprefixer')
  //           ]
  //         }
  //       }
  //     ],
  //     include: path.resolve(__dirname, '../'),
  //   })
  //   return config
  // },
  "framework": "@storybook/react"
}