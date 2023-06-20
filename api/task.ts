const app = require("../app");
const route = require("../routes/task");

app.use("/api/", route);

module.exports = app;

export {}
