const app = require("../app");
const ai = require("../routes/ai");

app.use("/api/", ai);

module.exports = app;
