const app = require("../app");
const user = require("../routes/user");

app.use("/api/", user);

module.exports = app;
