const dotenv = require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || 8000}`,
      changeOrigin: true
    })
  );
}