const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminSvgo = require('imagemin-svgo');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');


const imagemin = require('imagemin');
const rimraf = require('rimraf');


// тута я не знаю что это, но чтото что очищает свэгэшэчечки
rimraf('src/img/svg/clean-svg', () => {});

(async () => {
    await imagemin(['src/img/svg/mono-svg/*.svg'], {
        destination: 'src/img/svg/clean-svg',
        plugins: [
            imageminSvgo({
                plugins: [
                    { removeAttrs: { attrs: '(fill|stroke)' } },
                    { removeViewBox: false },
                    {
                        cleanupIDs: {
                            remove: true,
                            minify: true,
                            prefix: {
                                toString() {
                                    this.counter = this.counter || 0;
                                    return 'id' + this.counter++;
                                },
                            },
                            force: true,
                        },
                    },
                ],
                multipass: true,
            }),
        ],
    });
})();

// const through = require('through2');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.pug'));

const config = {
  context: PATHS.src,
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    optimizationBailout: true,
    colors: {
      green: '\u001b[32m',
    },
  },
  module: {
    rules: [
      // js
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // pug
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      },
      // scss
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV !== 'production',
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`,
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path]/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new ImageminPlugin({
            //disable: process.env.NODE_ENV !== 'production', // Disable during development
            test: /\.(jpe?g|png|gif)$/i, //|svg
            plugins: [
                imageminSvgo({
                    plugins: [
                    { removeAttrs: { attrs: '(fill|stroke)' } },
                    { removeViewBox: false },
                    {
                        cleanupIDs: {
                            remove: true,
                            minify: true,
                            prefix: {
                                toString() {
                                    this.counter = this.counter || 0;
                                    return 'id' + this.counter++;
                                },
                            },
                            force: true,
                        },
                    },
                ],
                multipass: true,
                })
            ],
            gifsicle: {
                interlaced: true,
                optimizationLevel: 3
            },
            optipng: {
                optimizationLevel: 5
            }
        }),
    // берем свгэшки чистинькие от какашек и делаем спрайты
    new SVGSpritemapPlugin('src/img/svg/clean-svg/**/*.svg', {
            output: {
                filename: `${PATHS.assets}img/sprite.svg`,
                chunk: {
                    name: 'sprite'
                }
            },
            sprite: {
                prefix: 'icon-'
            }
        }),
    // цветные спрайты
    new SVGSpritemapPlugin('src/img/svg/color-svg/**/*.svg', {
            output: {
                filename: `${PATHS.assets}img/sprite-color.svg`,
                chunk: {
                    name: 'sprite'
                }
            },
            sprite: {
                prefix: 'icon-color-'
            }
        }),
    new CopyPlugin([
      {
        from: './img',
        to: `${PATHS.assets}img`,
        ignore: ['.DS_Store', '.gitkeep', 'png/*', 'svg/*'],
      },
      { from: `${PATHS.src}/static`, to: '' },
    ]),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
      chunkFilename: 'css/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  resolve: {
    modules: ['node_modules'],
  },
};


module.exports = config;


