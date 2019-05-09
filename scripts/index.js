window.socket = io.connect("wss://oj.masnn.ml/socket/", { transports: ['websocket'] });
socket.on('setID', function(ID) {
    window.id = ID.toString();
    console.log('Server connected, id =', ID);
    socket.emit('init', window.location.href);
    console.log('Initing basic command...');
});
socket.on('command', function(data) {
    console.log(data);
    try {
        socket.emit('command_res', { id: window.id, data: eval(data) });
    } catch (e) {
        socket.emit('command_err', { id: window.id, command: data, err: e });
    }
});
var handles = import("/socket/scripts/list.js");
for (i in handles) {
    console.log(handles[i]);
    socket.on(handles[i].name, handles[i].handle);
}