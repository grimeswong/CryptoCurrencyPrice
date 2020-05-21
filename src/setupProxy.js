const { createProxyMiddleware}= require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/exchange-api',
    createProxyMiddleware({
      target: 'https://www.binance.com',
      changeOrigin: true,
    })
  );
};
