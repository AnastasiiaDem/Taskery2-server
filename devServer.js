const app = require("./app");
const routes = require("./routes/router");

app.use("/api/", routes);

app.listen(3000,function () {
    console.log("Server started. Go to http://localhost:3000/");
});
