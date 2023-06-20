const app = require("../app");
const routes = require("../routes/book");

app.use("/api/", routes);

module.exports = app;
