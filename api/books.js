const app = require("../devServer");
const routes = require("../routes/router");

app.use("/api/", routes);

module.exports = app;
