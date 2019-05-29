var logger = require('log4js').getLogger('main');
logger.level = 'all';
var handles = [];
handles.push(require('./handles/boardcast'));

var express = require('express');
var app_express = express();
var router = express.Router();
var bodyParser = require('body-parser');
var server = require('http').Server(app_express);
var io = require('socket.io')(server);
app_express.use(bodyParser.urlencoded({ extended: true }));

router.use('/', express.static(__dirname + "/node_modules"));
router.use('/', express.static(__dirname + "/public"));

global.app = io.of('/socket/');
var cnt = 0;
app.on('connection', function (socket) {
    cnt++;
    var id = socket.id.split('#')[1];
    var url = '/'
    logger.info('[Root] User connected, ID =', id, ' (', cnt, 'online )');
    socket.on('command_res', data => logger.info(data));
    socket.on('command_err', data => logger.warn(data));
    socket.on('init', function (URL) {
        url = URL;
        console.log(URL);
    })
    for (i in handles)
        socket.on(handles[i].name, handles[i].handle);
    socket.on('disconnect', function () {
        cnt--;
        logger.info('[Root] User disconnected, ID =', id, ' (', cnt, 'online )');
    })
    socket.emit('setID', id);
})

router.use('/', require('./plugins/github'));
router.use('/remotejudge', require('./plugins/remotejudge'));

app_express.use('/extra', router);
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    input = input.toString().trim();
    try {
        logger.info(eval(input));
    } catch (e) {
        logger.warn(e);
    }
});
server.listen(8889);
logger.info('App listening on:8889');
