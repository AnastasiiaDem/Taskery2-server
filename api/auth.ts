// @ts-ignore
const app = require("../src/server");
const auth = require("../routes/auth");

app.use("/api/", auth);

module.exports = app;
