const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const increaseSpecificity = require('postcss-increase-specificity');
const CopyPlugin = require('copy-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

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
    //new CopyPlugin([{ from: 'public', to: '.' }]),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }]
    }),

    // Creates a .br compressed version of each file output
    // including 'feedback-widget.js.br' and 'micro-react-app.js.br'
    new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		})

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
  //  Generated file: feedback-widget.js
  //
  //  The following file is generated automatically anytime
  //  another file inside this repo is saved. (make sure the
  //  server is running with `npm start`)
  //
  //  Static html files inside `/public` load said generated
  //  file even though you can't visibly see it in the repo.
  //
  //  To see a built version of 'feedback-widget.js' either
  //  load the source code from the browser dev tools or run
  //  `npm run build` to find it in the '/dist' folder.
  // ========================================================= //
  {
    ...defaultConfig,
    entry: './src/classes/WidgetClass.tsx',
    output: {
      path: distDir,
      publicPath: '/',
      filename: 'feedback-widget.js',
    },
    //devtool: 'source-map',
    //devtool: null,
    devServer: { port: 9001 },
  },
  {
    ...defaultConfig,
    entry: './src/components/MicroReactApp.tsx',
    output: {
      path: distDir,
      publicPath: '/',
      filename: 'micro-react-app.js',
    },
    //devtool: null,
    //devtool: 'source-map',
  }
];
