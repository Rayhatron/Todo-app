var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://todo:todo@ds127968.mlab.com:27968/todo_list_app');

//Create a schema/blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//Create a todo model based on schema
var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/', function(req, res){

    //get data from mlab database and send to view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todos: data});
    });
    
});

app.post('/', urlencodedParser, function(req, res){
    //get data from view and send to mlab nongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
    
});

app.delete('/:item', function(req, res){
    //delete requested item from mlab mongodb

    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    });

});

};