var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//app.use(express.static('/main.css'));
app.use(express.static(__dirname));

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/indexpmae.html');
});

io.on('connection',function(socket){
        socket.on('client_to_server', function(data) {
        io.sockets.emit('server_to_client', {value : data.value});
    });
    
    /*
    socket.on('message',function(msg){
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    */
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});