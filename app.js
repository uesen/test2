var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
var connectNum = 0;
var disconnectNum = 0;
var timer = null;

var socketArr = [];

var nowPlayerInfo = {
    id: '',
    x: 0,
    y: 0,
    z: 0,
    exi: false,
    con: false
};

var nonPlayerInfo = {
    id: '',
    x: 0,
    y: 0,
    z: 0,
    exi: false,
    con: false
};

socketArr[0] = nonPlayerInfo;


//app.use(express.static('/main.css'));
app.use(express.static(__dirname));

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/indexpmae.html');
});

io.sockets.on('connection',function(socket){
    connectNum++;
    console.log(connectNum);
    nowPlayerInfo.con = true;
    //nowPlayerInfo.exi = true;
    socketArr[connectNum] = nonPlayerInfo;
    // S07. client_to_server_broadcastイベント・データを受信し、送信元以外に送信する
    
    
    socket.on('client_to_server_broadcast', function(data) {
        /*
        nowPlayerInfo.id = data.value.id;
        nowPlayerInfo.x = data.value.x;
        nowPlayerInfo.y = data.value.y;
        nowPlayerInfo.z = data.value.z;
        */
        var flg = true;
        var i = 0;
        for (i = 0; i < socketArr.length; i++) {
            if (socketArr[i].id == data.value.id) {
                socketArr[i] = data.value;
                flg = false;
                //console.log(i+"までは行けてます")
            }
        }
        
        if (flg) {
            socketArr.push(data.value);
        }
        
        //console.log(nowPlayerInfo.exi);
        //console.log(socketArr);
        setInterval(function(){
        socket.broadcast.emit('server_to_client', socketArr);
            }, 1000/30);
        
    });
    
    socket.on('disconnect', function(){
    console.log("消えてました");
        nowPlayerInfo.con = false;
        nowPlayerInfo.exi = false;
        disconnectNum++;
        //socket.broadcast.emit('server_to_client', {value : nowPlayerInfo});
    
});
        
    
    
/*
    */

    //console.log('server listening. Port:' + PORT);
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