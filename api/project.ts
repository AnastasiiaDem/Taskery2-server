const app = require("../app");
const route = require("../routes/project");

app.use("/api/", route);

module.exports = app;

export {}
