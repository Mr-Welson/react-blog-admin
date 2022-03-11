const webpack = require('webpack');
const { when, whenDev, whenProd } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const path = require('path');

// const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  style: {
    modules: {
      localIdentName: '[local]--[hash:base64:5]',
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#125bb6' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
      // 支持装饰器
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  },
  webpack: {
    // 关闭sourceMap
    // devtool: false,
    devtool: 'source-map',
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
      // 使用 dayjs 替换 moment
      new AntdDayjsWebpackPlugin(),
      ...whenDev(
        () => [
          // 分析打包大小
          new BundleAnalyzerPlugin({
            // analyzerMode: 'static', // html 文件方式输出编译分析
            // reportFilename: path.resolve(__dirname, `analyzer/index.html`),
            openAnalyzer: false,
            analyzerPort: 7777,
          }),
        ],
        []
      ),
      ...whenProd(
        () => [
          // 开启 gzip 压缩包
          new CompressionWebpackPlugin({
            test: /\.js$|\.css$/,
            threshold: 1024,
          }),
          new webpack.optimize.AggressiveMergingPlugin(), // 合并块
          new webpack.optimize.ModuleConcatenationPlugin(),
        ],
        []
      ),
    ],
    // 抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  devServer: {
    // 修改启动端口
    port: 5010,
    proxy: {
      '/api': {
        target: 'http://localhost:4000/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
