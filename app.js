var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();
var port = process.env.PORT || 3000;

//Set up template engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('./public'));

//Fire controllers
todoController(app);

//Listen to port
//app.listen(3000, '0.0.0.0');
app.listen(port, function() {
    console.log("App is running on port " + port);
});

//console.log('You are listening to port 3000');