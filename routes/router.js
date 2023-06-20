//routing for local development server (devServer.js)

const router = require("express").Router();

const book = require("./book");
const books = require("./books");

router.get("/", async function (req, res) {
  //homepage route returns some HTML
  res.send(`<h1>Reached home!</h1>
            <br>
            <a href='/books'>Books</a>`);
});

router.use("/", book);
router.use("/", books);

module.exports = router;
