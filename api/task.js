const app = require("../app");
const task = require("../routes/task");

app.use("/api/", task);

module.exports = app;
