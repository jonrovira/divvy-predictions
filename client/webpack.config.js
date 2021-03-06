const path    = require('path'),
	  merge   = require('webpack-merge'),
	  webpack = require('webpack');



const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	fontAwesome: path.join(__dirname, 'node_modules/font-awesome'),
	images: path.join(__dirname, 'app/img'),
	fonts: path.join(__dirname, 'app/font')
};



process.env.BABEL_ENV = TARGET;



const common = {
	entry: {
		app: PATHS.app
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		publicPath: '/divvy-predictions/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
			  test: /\.otf$/,
			  loader: 'url',
			  include: PATHS.fonts
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				include: [PATHS.app, PATHS.fonts, PATHS.fontAwesome]
			},
			{
				test: /\.jsx?$/,
				loaders: ['babel?cacheDirectory'],
				include: PATHS.app
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff",
				include: PATHS.fontAwesome
			},
      		{
      			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      			loader: "file-loader",
      			include: PATHS.fontAwesome
      		},
      		{
      			test: /\.(jpg|png|ico)$/,
      			loader: 'url?limit=25000',
      			include: PATHS.images
      		}
      		// {
      		// 	test: /\.(ico)$/,
      		// 	loader: 'file-loader',
      		// 	include: PATHS.images
      		// }
		]
	}
};



if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}



if (TARGET === 'build') {
	module.exports = merge(common, {});
}