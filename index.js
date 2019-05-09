var handles = [];
handles.push(require('./handles/boardcast'));

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use('/', function(req, res, next) {
    console.log(req.path);
    next();
})
app.use('/socket/scripts/', express.static(__dirname + "/scripts"));

global.app_socket = io.of('/socket/');
var cnt = 0;

app_socket.on('connection', function(socket) {
    cnt++;
    var id = socket.id.split('#')[1];
    var url = '/'
    console.log('Root-------------------------------------');
    console.log('User connected, ID =', id);
    console.log('Current', cnt, 'users online.');
    socket.on('command_res', data => console.log('[INFO]', data));
    socket.on('command_err', data => console.warn('[WARN]', data));
    socket.on('init', function(URL) {
        url = URL;
    })
    for (i in handles) {
        console.log(handles[i]);
        socket.on(handles[i].name, handles[i].handle);
    }
    socket.on('disconnect', function() {
        cnt--;
        console.log('Root----------------------------------------');
        console.log('User disconnected, ID =', id);
        console.log('Current', cnt, 'users online.');
    })
    socket.emit('setID', id);
})
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    input = input.toString().trim();
    try {
        console.log(eval(input));
    } catch (e) {
        console.warn(e);
    }
});

server.listen(8889);
console.log('App listening on:8889');