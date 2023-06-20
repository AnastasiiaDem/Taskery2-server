const app = require("./app");
const routes = require("./routes/router");

app.use("/api/", routes);

app.listen(3001, () => {
    console.log(`Server is working on ${PORT} port`);
});
