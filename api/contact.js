const app = require("../app");
const contact = require("../routes/contact");

app.use("/api/", contact);

module.exports = app;
