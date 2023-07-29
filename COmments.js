//create web server.
var express = require('express');
var app = express();
//create server.
var server = require('http').createServer(app);
//create socket server.
var io = require('socket.io')(server);
//create mongoose.
var mongoose = require('mongoose');
//connect to database.
mongoose.connect('mongodb://localhost/comments');
//create schema.
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});
//create model.
var Comment = mongoose.model('Comment', commentSchema);
//create route.
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});
//create socket connection.
io.on('connection', function(socket){
    //show all the comments.
    Comment.find({}, function(err, comments){
        if(err) throw err;
        socket.emit('show all comments', comments);
    });
    //add comment.
    socket.on('add comment', function(data){
        var newComment = new Comment({name: data.name, comment: data.comment});
        newComment.save(function(err, comment){
            if(err) throw err;
            io.emit('show comment', comment);
        });
    });
});
//listen to port 3000.
server.listen(3000, function(){
    console.log('listening to port 3000');
});