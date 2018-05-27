import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';
import { getConfig } from '../source/config';
import webpackConfig from '../webpack.config.dev';
const bundler = webpack(webpackConfig);
const ajaxPrefix = getConfig().ajaxPrefix;
const apiProxy = proxy(ajaxPrefix, {
    target: 'http://localhost:4000',
    changeOrigin: true,
    ws: true
});

browserSync({
    server: {
        baseDir: 'source'
    },
    middleware: [
        apiProxy,
        // TODO 使用server.router优化，
        // or use https://github.com/tinganho/connect-modrewrite
        function (req, res, next) {
            if (req.url === '/login/') {
                req.url = '/login/login.html';
            } else if (req.url === '/door/') {
                req.url = '/door/door.html';
            }
            return next();
        },
        // 使用historyApiFallback做SPA路由，暂时用不到
        historyApiFallback({
            // 详细日志
            // verbose: true,
            rewrites: [
                // 排除.js路径
                { from: /\/door\/[^.]+$/, to: '/door/door.html' }
            ]
        }),
        webpackDevMiddleware(bundler, {
            // Dev middleware can't access config, so we provide publicPath
            publicPath: webpackConfig.output.publicPath,

            // pretty colored output
            stats: { colors: true },

            // Set to false to display a list of each file that is being bundled.
            noInfo: false,

            // for other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler),
        
    ],
    files: [
        'source/*.html'
      ]
})