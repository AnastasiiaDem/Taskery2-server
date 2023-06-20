//routing for local development server (devServer.js)

const router = require("express").Router();

const book = require("./book");
const books = require("./books");
const auth = require("./auth");
const project = require("./project");
const task = require("./task");
const user = require("./user");
const contact = require("./contact");
const ai = require("./ai");
const {sendEmail} = require("../src/controllers/emailController");

router.get('/', (req, res) => {
  res.send('Test endpoint');
});

router.use('/auth/', auth);
router.use('/project/', project);
router.use('/task/', task);
router.use('/user/', user);
router.use('/contact/', contact);
router.use('/ai/', ai);

router.post('/email', sendEmail);

module.exports = router;
