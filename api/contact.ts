const app = require("../app");
const route = require("../routes/contact");

app.use("/api/", route);

module.exports = app;

export {}
