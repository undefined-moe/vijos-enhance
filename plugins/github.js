var router = require('express').Router();
var logger = require('log4js').getLogger('OAuth-Github');
var config = require('../config');
var axios = require('axios');
var vijos = require('../utils/vijos');
var bson = require('bson');
var MongoDB = require('../utils/db');
logger.level = config.logLevel || 'all';
var oauth_info = {
    path: "https://github.com/login/oauth/authorize",
    token_path: "https://github.com/login/oauth/access_token",
    api_path: "https://api.github.com",
}
async function get_token(code) {
    var t = await axios.get(oauth_info.token_path, {
        params: {
            client_id: config.oauth.github.client_id,
            client_secret: config.oauth.github.client_secret,
            code: code
        }
    })
    return t.data.split('&')[0].split('=')[1]
}
async function api(path, token) {
    var t = await axios.get(oauth_info.api_path + path, {
        headers: { Authorization: 'token ' + token }
    }).catch(e => { logger.warn(e.code) });
    return t.data;
}
router.get('/', function (req, res) {
    res.redirect(oauth_info.path + '?' + [
        'client_id=' + config.oauth.github.client_id,
        'scope=' + config.oauth.github.scope].join('&'));
});
router.get("/callback", async function (req, res) {
    var token = await get_token(req.query.code);
    logger.info('Token:', token);
    var udoc = await api('/user/emails', token);
    var mongo = new MongoDB();
    var db = await mongo.connect(config.db);
    var index = await db.collection('oauth').findOne({ email: udoc[0].email, field: 'github' });
    if (!index) {
        var uid = await inc_ouid_counter();
        var pass = new bson.ObjectID().toHexString;
        await db.collection('oauth').insertOne({ email: udoc[0].email, pass, field: 'github' });
        vijos.reg(uid, name, pass);
    } else {
        vijos.login(uid, name)
    }
});
module.exports = router;