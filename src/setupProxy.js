const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api',
      {
        target: 'https://httpbin.org/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    )
  );
};