const app = require("../app");
const project = require("../routes/project");

app.use("/api/", project);

module.exports = app;
