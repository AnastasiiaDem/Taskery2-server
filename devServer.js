const app = require("./app");
const routes = require("./routes/router");
const PORT = process.env.PORT;

app.use("/api/", routes);

app.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`);
});
