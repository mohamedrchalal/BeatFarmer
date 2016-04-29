
var util = require("util"),
    io = require("socket.io");
var activeKicks = [];
var activeSnare = [];
var activeHat = [];
var activeCrash = [];

var socket;

function init(){
  socket = io.listen(8000);
  console.log(socket);
  setEventHandlers();
};

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
    util.log("New user has connected: "+ client.id);
    client.on("disconnect", onClientDisconnect);
    client.on("update kick", onUpdateKick);
};

function onUpdateKick(data){
  activeKicks = data.kickArray;
  this.broadcast.emit('emitKickArray', {kickArray: data.kickArray});
  util.log('kickupdated', activeKicks);
}
function onClientDisconnect(){
console.log('later')
}


init();
