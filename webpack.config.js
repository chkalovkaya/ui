const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = (env) => {
	return {
		mode: env.production ? 'production' : 'development',
		entry: {
			styles: path.resolve(__dirname, 'src', 'assets', 'scss', 'global.scss'),
			app: path.resolve(__dirname, 'src', 'public', 'App.js'),
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: 'js/[name].[contenthash:8].js',
			chunkFilename: 'js/[name].[contenthash:8].js',
		},

		module: {
			rules: [
				{ test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
				{ test: /\.vue$/, use: [{ loader: 'vue-loader', options: { hotReload: env.development } }] },
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
					type: 'asset/resource',
					generator: { filename: 'fonts/[name][ext]' }
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					exclude: path.resolve(__dirname, 'src', 'assets', 'icons', 'sprite'),
					type: 'asset/resource',
					generator: { filename: 'images/[name].[contenthash:8][ext]' }
				},
				{
					test: /\.svg$/,
					include: path.resolve(__dirname, 'src', 'assets', 'icons', 'sprite'),
					use: [{ loader: 'svg-sprite-loader', options: { extract: true, spriteFilename: 'sprite.[contenthash:8].svg'} }]
				},
				{
					test: /\.(css|s[ac]ss)$/i,
					use: [
						MiniCssExtractPlugin.loader,
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' },
						{ loader: 'sass-resources-loader', options: {
								resources: [
									path.resolve(__dirname, 'src', 'assets', 'scss', 'variables.scss'),
									path.resolve(__dirname, 'src', 'assets', 'scss', 'mixins.scss'),
								]
							},
						},
					]
				}
			]
		},

		devtool: env.production ? false : 'eval-source-map',
		devServer: { hot: true },
		optimization: {
			minimize: env.production,
			moduleIds: 'deterministic',
			runtimeChunk: 'single',
			splitChunks: {
				minSize: 0,
				maxInitialRequests: Infinity,
				cacheGroups: {
					defaultVendors: {
						chunks: 'all',
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						enforce: true,
						priority: 15,
					}
				}
			}
		},

		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@icons': path.resolve(__dirname, 'src', 'assets', 'icons'),
				'@scss': path.resolve(__dirname, 'src', 'assets', 'scss'),
				'@composables': path.resolve(__dirname, 'src', 'composables'),
				'@elements': path.resolve(__dirname, 'src', 'components', 'elements'),
				'@layouts': path.resolve(__dirname, 'src', 'components', 'layouts')
			}
		},

		plugins: [
			new HTMLWebpackPlugin({
				template: path.resolve(__dirname, 'src', 'public', 'index.html'),
				filename: 'index.html'
			}),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css'
			}),
			new VueLoaderPlugin(),
			new SpriteLoaderPlugin()
		],
	}
};