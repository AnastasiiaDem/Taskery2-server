const app = require("../app");
const routes = require("../routes/books");

app.use("/api/", routes);

module.exports = app;
