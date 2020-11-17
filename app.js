var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
var connectNum = 0;
var disconnectNum = 0;
var timer = null;

var socketArr = [];
/*
var nowPlayerInfo = {
    id: '',
    x: 0,
    y: 0,
    z: 0,
    exi: false,
    con: false
};
*/
/*
var nonPlayerInfo = {
    id: '',
    x: 0,
    y: 0,
    z: 0,
    exi: false,
    con: false
};
*/
//socketArr[0] = nonPlayerInfo;


//app.use(express.static('/main.css'));
app.use(express.static(__dirname));

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/indexpmae.html');
});


      
io.on('connection',function(socket){
    
    //connectNum++;
    //nowPlayerInfo.con = true;
    //nowPlayerInfo.exi = true;
        var nonPlayerInfo = {
            id: "",
            x: Math.random()*1000,
            y: Math.random()*1000,
            z: Math.random()*1000,
            exi: false,
            con: true
        };
    
    
    socketArr[connectNum] = nonPlayerInfo;
    
    socket.on('id_emit', function(data){
        var flg2 = true;
        var int = 0
        for (int = 0; int < socketArr.length; int++){
           if (socketArr[int].id == socket.id) {
               console.log("同じID("+socketArr[int].id+")からの接続がありました");
               flg2 = true;
               break;
           }else{
               console.log("同じIDを検索中です");
                flg2 = false;
                }
           }
        
        if(flg2 == false){
        io.to(socket.id).emit('id_on',socket.id);//次買えるならココ
        socketArr[connectNum].id = socket.id;
        connectNum++;
        console.log("新しくIDを追加しました..."+connectNum+"個目");
        }   
      
        });
    
    
    /*
    var flg2 = true;
    var int = 0
       for (int = 0; int < socketArr.length; int++){
           if (socketArr[int].id == socket.id) {
               console.log("同じIDからの接続がありました");
               flg2 = true;
               break;
           }else{
               console.log("同じIDを検索中です");
                flg2 = false;
                }
           }
    
    if(flg2 == false){
        connectNum++;
        console.log("新しくIDを追加しました..."+connectNum+"個目");
        }   
      
    socketArr[connectNum] = nonPlayerInfo;
       */
    
    socket.on('client_to_server_broadcast', function(data) {
        
        //console.log("data="+data);
        //console.log("data.value="+data.value);
        /*
        nowPlayerInfo.id = data.value.id;
        nowPlayerInfo.x = data.value.x;
        nowPlayerInfo.y = data.value.y;
        nowPlayerInfo.z = data.value.z;
        */
        var flg = true;
        var i = 0;
        for (i = 0; i < socketArr.length; i++) {
            //console.log(data.value.id + "はdata.value.id");
            if (socketArr[i].id == data.value.id) {
                if(typeof data.value.x === "undefined"){}else{
                    socketArr[i].x = data.value.x;
                    socketArr[i].y = data.value.y;
                    socketArr[i].z = data.value.z;
                    socketArr[i].con = data.value.con;
                }//一つ一つ判別したほうがいい気
                //console.log(data.value);
                flg = false;
                //console.log(i+"までは行けてます")
            }
        }
        /*
        if (flg) {
            socketArr.push(data.value);
        }
        */
        //console.log(nowPlayerInfo.exi);
        //console.log(socketArr);
        //console.log(connectNum);
        
        //setInterval(function(){
        socket.broadcast.emit('server_to_client', {value :socketArr});
        //socket.emit('server_to_client', {value :socketArr});//これだとサーバー停まる
           // }, 1000/30);
        
    });
    
    socket.on('disconnect', function(){
       console.log("消えてました");
        /*
        var int2 = 0;
        var flg3 = true;
        for (int2 = 0; int2 < socketArr.length; int2++){
           if (socketArr[int2].id == socket.id) {
               console.log(socket.id + "からの接続がきれました");
               flg2 = true;
               break;
           }else{
               console.log("消えたIDを検索中です");
                flg2 = false;
                }
           }
        */
        
        //nowPlayerInfo.con = false;
        //nowPlayerInfo.exi = false;
        disconnectNum++;
        //socket.broadcast.emit('server_to_client', {value : nowPlayerInfo});
    
});
        

});



http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});