const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://groupa-project.azurewebsites.net",
      changeOrigin: true,
    })
  );
};
