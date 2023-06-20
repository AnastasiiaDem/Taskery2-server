const routes = require("./routes/router");
require("dotenv").config();
const express = require("express");
const app = express();

app.use("/api/", routes);

app.listen(3000,function () {
    console.log("Server started. Go to http://localhost:3000/");
});

module.exports = app;
