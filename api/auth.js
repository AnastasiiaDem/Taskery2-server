const app = require("../app");
const auth = require("../routes/auth");

app.use("/api/", auth);

module.exports = app;
