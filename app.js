const express = require("express");

const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const port = process.env.PORT || 8000;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static("public"));

// Templating Engine
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// connect to db
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
});

// Router
// app.get("", (req, res) => {
//   res.render("home");
// });
const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(port, () => console.log(`Listening to the port ${port}`));
