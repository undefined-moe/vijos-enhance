var logger = require('log4js').getLogger('handle-boardcast');
logger.level = 'all';
module.exports = {
    name: 'boardcast',
    handle: function(data) {
        try {
            logger.info('Broadcasting:', data);
            app.emit('alert', data);
        } catch (e) {
            logger.error(e);
        }
    }
}