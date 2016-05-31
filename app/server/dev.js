import express from "express"
import config from "./config/config.js"
import webpack from 'webpack'
import webpackConfig from '../webpack.config.dev'


module.exports = function(app) {

// TODO: separate this to a different process to avoid recompiles on server restart - 2016-03-21
    var compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath || ''
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use('/static', express.static(config.static_root))
}
