
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
    client.on("updatekick", onUpdateKick);
    client.on("updatesnare", onUpdateSnare);
    client.on("updatehat", onUpdateHat);
    client.on("updatecrash", onUpdateCrash);

};

function onUpdateKick(data){
  activeKicks = data.kickArray;
  this.broadcast.emit('emitKickArray', {kickArray: data.kickArray});
  util.log('kickupdated', activeKicks);
};
function onUpdateSnare(data){
  activeSnare = data.snareArray;
  this.broadcast.emit('emitSnareArray', {snareArray: data.snareArray});
  util.log('snareupdated', activeSnare);
};
function onUpdateHat(data){
  activeHats = data.hatArray;
  this.broadcast.emit('emitHatArray', {hatArray: data.hatArray});
  util.log('hatupdated', activeHats);
};
function onUpdateCrash(data){
  activeCrashs = data.crashArray;
  this.broadcast.emit('emitCrashArray', {crashArray: data.crashArray});
  util.log('crashupdated', activeCrashs);
};
function onClientDisconnect(){
console.log('later')
};


init();
