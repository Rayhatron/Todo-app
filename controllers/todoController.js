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

var itemOne = Todo({item: 'Buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
    console.log(data);
});

app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });

    res.json(data); 
});

};