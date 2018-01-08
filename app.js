var express = require("express");
var todoControllers = require("./controllers/todoControllers");

var app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));

todoControllers(app);

app.listen(3000, "0.0.0.0");
console.log("Listening to port 3000");
