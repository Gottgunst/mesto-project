const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/components/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/places/[name]-[hash][ext]',
        },
      },
       {
        test: /avatar.+\.(png|jpg|gif|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/avatar/[name]-[hash][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/svg/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/images/places'),
    //       to: path.resolve(__dirname, 'dist/images/places')
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src/images/avatar'),
    //       to: path.resolve(__dirname, 'dist/images/avatar')
    //     }
    //   ]
    // }),
  ]
}
