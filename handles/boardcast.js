module.exports = {
    name: 'boardcast',
    handle: function(data) {
        console.log('Broadcasting:', data);
        app_socket.emit('alert', data);
    }
}