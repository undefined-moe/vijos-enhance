socket.removeEventListener('alert');
socket.on('alert', function(data) {
    alert(data);
});
console.info('Module boardcast inited.');