const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const increaseSpecificity = require('postcss-increase-specificity');
const CopyPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

const defaultConfig = {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: publicDir,
    compress: true,
    port: 9000,
  },
  plugins: [
    // new CleanWebpackPlugin({protectWebpackAssets: false}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new CopyPlugin([{ from: 'public', to: '.' }]),
    // devMode ? null : new JavaScriptObfuscator(),
  ].filter((i) => i),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/components'),
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // fallback to style-loader in development
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'cssimportant-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                increaseSpecificity({
                  stackableRoot: '.cleanslate',
                  repeat: 1,
                }),
              ],
              sourceMap: devMode,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = [
  
  // ========================================================= //
  //
  //  generated file: ripple-widget.min.js
  //
  //  The following file is generated automatically anytime
  //  another file inside this repo is saved. (make sure the
  //  server is running with `npm start`)
  //
  //  Static html files inside `/public` load said generated
  //  file even though you can't visibly see it in the repo.
  //
  //  To see a built version of 'ripple-widget.min.js' either
  //  load the source code from the browser dev tools or run
  //  `npm run build` to find it in the '/dist' folder.
  // ========================================================= //
  {
    ...defaultConfig,
    entry: './src/classes/WidgetClass.tsx',
    output: {
      path: distDir,
      publicPath: '/',
      filename: 'ripple-widget.min.js',
    },
    devtool: 'source-map',
  },

  {
    ...defaultConfig,
    entry: './src/components/MicroReactApp.js',
    output: {
      path: distDir,
      publicPath: '/',
      filename: 'ripple-widget.react-example.js',
    },
    devtool: 'source-map',
  },

//   {
//     ...defaultConfig,
//     entry: './src/components/embeddable-widget.js',
//     output: {
//       path: distDir,
//       library: 'EmbeddableWidget',
//       publicPath: '/',
//       filename: 'embeddable-widget.js',
//     },
//     devtool: 'source-map',
//   },
//   {
//     ...defaultConfig,
//     entry: './src/components/custom-embeddable.js',
//     output: {
//       path: distDir,
//       library: 'EmbeddableWidget',
//       publicPath: '/',
//       filename: 'custom-widget.js',
//     },
//     devtool: 'source-map',
//   },
//   {
//     ...defaultConfig,
//     entry: './src/components/custom-embeddable-playground.js',
//     output: {
//       path: distDir,
//       library: 'EmbeddableWidget',
//       publicPath: '/',
//       filename: 'custom-widget-playground.js',
//     },
//     devtool: 'source-map',
//   },
];

// module.exports = [{
//   ...defaultConfig,
//   entry: './src/outputs/embeddable-widget.js',
//   output: {
//     path: distDir,
//     publicPath: '/',
//     filename: 'widget.js',
//     library: 'EmbeddableWidget',
//     libraryExport: 'default',
//     libraryTarget: 'window',
//   },
// },
// {
//   ...defaultConfig,
//   entry: './src/outputs/bookmarklet.js',
//   output: {
//     path: distDir,
//     publicPath: '/',
//     filename: 'bookmarklet.js',
//   },
// }
// ];