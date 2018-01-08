var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect("mongodb://test:test@ds113835.mlab.com:13835/todo");

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model("Todo", todoSchema);



//var data = [{item: "Eat soya chaap"}, {item: "walk dog"}, {item: "study c&s"}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  app.get("/todo", function (req, res) {
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render("todo", {todos: data});
    });


  });

  app.post("/todo", urlencodedParser, function (req, res) {
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    })
    //data.push(req.body);


  });

  app.delete("/todo/:item", function (req, res) {

    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });



};
