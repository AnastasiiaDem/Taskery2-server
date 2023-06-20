const app = require("../app");
const route = require("../routes/ai");

app.use("/api/", route);

module.exports = app;

export {}
